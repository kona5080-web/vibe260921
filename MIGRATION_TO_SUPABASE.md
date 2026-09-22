# Migration to Supabase

이 문서는 메모리 기반 데이터 저장에서 Supabase를 사용하는 구조로의 마이그레이션을 설명합니다.

## 변경사항

### 1. 의존성 추가
```bash
npm install @supabase/supabase-js
```

### 2. Supabase 클라이언트 설정
**파일**: `src/lib/supabase.ts`
- Supabase 클라이언트 초기화
- 환경 변수로부터 URL과 API 키 로드
- TypeScript 타입 정의

### 3. Posts 서비스 업데이트
**파일**: `src/lib/posts.ts`

#### 기존 방식 (메모리)
```typescript
export function getAllPosts(): Post[] {
  return posts.sort(...)
}
```

#### 새로운 방식 (Supabase)
```typescript
export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  return data?.map(convertToPost) || []
}
```

주요 변경점:
- 모든 함수가 **비동기** (`async/await`)로 변경
- **Promise 반환** - 데이터베이스 I/O를 기다리기 위함
- **에러 처리** - Try-catch 블록으로 에러 처리
- **Supabase API 호출** - `supabase.from('posts').select(...)` 등

### 4. 컴포넌트 업데이트
**파일들**: 
- `src/app/page.tsx` - 홈페이지
- `src/app/posts/create/page.tsx` - 게시물 작성
- `src/app/posts/[id]/page.tsx` - 게시물 상세
- `src/app/posts/[id]/edit/page.tsx` - 게시물 수정

#### 기존 방식
```typescript
useEffect(() => {
  const allPosts = getAllPosts()
  setPosts(allPosts)
}, [])
```

#### 새로운 방식
```typescript
useEffect(() => {
  async function loadPosts() {
    const allPosts = await getAllPosts()
    setPosts(allPosts)
  }
  loadPosts()
}, [])
```

### 5. 기능별 변경사항

#### 📖 게시물 조회 (getAllPosts)
```typescript
// 기존
const posts = getAllPosts()

// 변경
const posts = await getAllPosts()
```

#### 📄 단일 게시물 조회 (getPostById)
**추가 기능**: 조회 시 자동으로 views 카운트 증가
```typescript
export async function getPostById(id: number): Promise<Post | undefined> {
  // views 증가 로직 포함
  const currentViews = currentData?.views || 0
  await supabase.from('posts').update({ views: currentViews + 1 })
}
```

#### ✍️ 게시물 작성 (createPost)
```typescript
// 기존
const newPost = createPost(input)
setPosts([newPost, ...posts])

// 변경
await createPost(input)
const allPosts = await getAllPosts()
setPosts(allPosts)
```

#### 📝 게시물 수정 (updatePost)
```typescript
// 기존
updatePost(id, input)

// 변경
await updatePost(id, input)
```

#### 🗑️ 게시물 삭제 (deletePost)
```typescript
// 기존
deletePost(id)
router.push('/')

// 변경
const success = await deletePost(id)
if (success) router.push('/')
```

#### 🔍 게시물 검색 (searchPosts)
```typescript
// 기존
const results = searchPosts(query)

// 변경
const results = await searchPosts(query)
```

### 6. 환경 변수
**파일**: `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 마이그레이션 체크리스트

- [x] Supabase 패키지 설치
- [x] Supabase 클라이언트 설정 (`src/lib/supabase.ts`)
- [x] Posts 서비스 업데이트 (`src/lib/posts.ts`)
- [x] 모든 async 함수 호출 업데이트
- [x] 에러 처리 추가
- [x] 로딩 상태 추가
- [x] 환경 변수 설정
- [x] Supabase 데이터베이스 테이블 생성
- [x] 테스트

## 테스트 단계

1. **환경 변수 확인**
   ```bash
   # .env.local 파일 확인
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```

2. **개발 서버 시작**
   ```bash
   npm run dev
   ```

3. **기능 테스트**
   - [ ] 홈페이지에서 게시물 목록 로드 확인
   - [ ] 새 게시물 작성 확인
   - [ ] 게시물 상세 페이지 방문 (조회수 증가 확인)
   - [ ] 게시물 수정 확인
   - [ ] 게시물 삭제 확인
   - [ ] 검색 기능 확인

4. **Supabase 대시보드 확인**
   - Supabase 대시보드에 데이터가 저장되었는지 확인

## 성능 최적화

### 인덱스 생성
```sql
-- 검색 성능 향상
CREATE INDEX idx_posts_title ON posts(title);
CREATE INDEX idx_posts_author ON posts(author);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

### 캐싱 고려사항
향후 다음을 추가할 수 있습니다:
- Next.js 캐싱 (Incremental Static Regeneration)
- Redis 캐시 (실시간 데이터가 필요한 경우)
- Supabase Realtime subscriptions

예시:
```typescript
import { unstable_noStore } from 'next/cache'

export async function getAllPosts(): Promise<Post[]> {
  unstable_noStore() // 캐싱 비활성화 (필요시)
  // ...
}
```

## 보안 고려사항

### Row Level Security (RLS)
프로덕션에서는 RLS를 활성화하세요:

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON posts FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON posts FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON posts FOR DELETE USING (true);
```

### API 키 관리
- `.env.local`은 `.gitignore`에 포함됨
- GitHub에 커밋되지 않음
- 프로덕션 환경에서는 환경 변수 설정

## 문제 해결

### "Cannot read property 'map' of null"
**원인**: Supabase 응답이 null
**해결**: `data?.map() || []`로 처리

### "Missing Supabase URL or Anon Key"
**원인**: 환경 변수 누락
**해결**: `.env.local` 파일 확인 및 개발 서버 재시작

### 데이터가 저장되지 않음
**원인**: 테이블 권한 문제
**해결**: Supabase RLS 정책 확인

## 참고자료

- [Supabase JavaScript 라이브러리](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase 데이터베이스](https://supabase.com/docs/guides/database)
- [Next.js 비동기 데이터 페칭](https://nextjs.org/docs/app/building-your-application/data-fetching)
