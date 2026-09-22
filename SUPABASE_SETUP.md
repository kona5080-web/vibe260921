# Supabase Setup Guide

이 프로젝트는 Supabase를 사용하여 데이터베이스에 게시물을 저장합니다. 아래의 단계를 따라 Supabase를 설정하세요.

## 1️⃣ Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 웹사이트에 방문합니다.
2. GitHub 또는 Google 계정으로 로그인/회원가입합니다.
3. "New Project" 버튼을 클릭합니다.
4. 프로젝트 정보를 입력합니다:
   - **Name**: DemoBoard (또는 원하는 이름)
   - **Database Password**: 안전한 비밀번호 설정
   - **Region**: 가장 가까운 지역 선택

## 2️⃣ API 키 가져오기

1. Supabase 프로젝트 대시보드에서 "Settings" → "API"로 이동합니다.
2. 다음 정보를 복사합니다:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`로 사용
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`로 사용

## 3️⃣ 환경 변수 설정

1. 프로젝트 루트에 `.env.local` 파일을 생성합니다.
2. 다음 내용을 추가합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

예시:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4️⃣ 데이터베이스 테이블 생성

### 방법 1: SQL 에디터 사용 (권장)

1. Supabase 대시보드의 "SQL Editor" 메뉴로 이동합니다.
2. "New Query"를 클릭합니다.
3. 아래의 SQL 코드를 복사하여 붙여넣습니다:

```sql
-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for search optimization
CREATE INDEX idx_posts_title ON posts(title);
CREATE INDEX idx_posts_author ON posts(author);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Insert sample data (optional)
INSERT INTO posts (title, content, author, views, created_at, updated_at) VALUES
(
  'Welcome to DemoBoard',
  'This is the first post on DemoBoard. Feel free to create, edit, and delete posts!',
  'Admin',
  42,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  'How to use DemoBoard',
  'DemoBoard is a simple bulletin board system. You can create new posts, view them, edit, and delete.',
  'User',
  28,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  'Next.js with Tailwind CSS',
  'This project uses Next.js 14, TypeScript, and Tailwind CSS for styling. It also uses Supabase for database management.',
  'Developer',
  15,
  NOW(),
  NOW()
);
```

4. "Run" 버튼을 클릭하여 쿼리를 실행합니다.

### 방법 2: SQL 파일 사용

1. 프로젝트 디렉토리에 있는 `supabase_schema.sql` 파일을 엽니다.
2. 전체 내용을 복사합니다.
3. Supabase SQL 에디터에 붙여넣고 실행합니다.

## 5️⃣ Row Level Security (선택사항)

더 안전한 운영을 위해 RLS를 활성화할 수 있습니다:

```sql
-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read
CREATE POLICY "Enable read access for all users"
  ON posts FOR SELECT
  USING (true);

-- Create policy to allow public insert
CREATE POLICY "Enable insert for authenticated users"
  ON posts FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public update
CREATE POLICY "Enable update for authenticated users"
  ON posts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create policy to allow public delete
CREATE POLICY "Enable delete for authenticated users"
  ON posts FOR DELETE
  USING (true);
```

## 6️⃣ 애플리케이션 실행

1. 개발 서버를 시작합니다:
```bash
npm run dev
```

2. 브라우저에서 `http://localhost:3000`을 엽니다.

3. 게시물을 생성하고 Supabase 데이터베이스에 저장되는지 확인합니다.

## 🔍 Supabase에서 데이터 확인

1. Supabase 대시보드의 "Table Editor"로 이동합니다.
2. `posts` 테이블을 클릭하여 저장된 데이터를 확인합니다.

## ⚠️ 주의사항

- `.env.local` 파일은 `.gitignore`에 추가되어 있습니다. 이 파일은 GitHub에 커밋되지 않습니다.
- API 키를 공개하지 마세요!
- 프로덕션 환경에서는 RLS를 반드시 활성화하세요.
- 정기적으로 데이터베이스를 백업하세요.

## 🆘 문제 해결

### "Missing Supabase URL or Anon Key" 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인합니다.
- `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 올바르게 설정되어 있는지 확인합니다.
- 개발 서버를 재시작합니다 (`npm run dev`).

### 데이터베이스 연결 오류
- Supabase 프로젝트가 활성화되어 있는지 확인합니다.
- API 키가 유효한지 확인합니다.
- 네트워크 연결 상태를 확인합니다.

### 게시물이 저장되지 않음
- 브라우저 콘솔에서 오류 메시지를 확인합니다 (F12 키 → Console 탭).
- Supabase 대시보드의 "Database" → "Posts" 테이블이 존재하는지 확인합니다.
- 테이블 권한이 올바르게 설정되어 있는지 확인합니다.

## 📚 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트 라이브러리](https://supabase.com/docs/reference/javascript)
- [Next.js 환경 변수](https://nextjs.org/docs/basic-features/environment-variables)
