import { Post, CreatePostInput, UpdatePostInput } from '@/types'

// 메모리에 데이터 저장 (Supabase 미설정 시 사용)
let posts: Post[] = [
  {
    id: 1,
    title: 'Welcome to DemoBoard',
    content: 'This is the first post on DemoBoard. Feel free to create, edit, and delete posts!',
    author: 'Admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    views: 42,
  },
  {
    id: 2,
    title: 'How to use DemoBoard',
    content: 'DemoBoard is a simple bulletin board system. You can create new posts, view them, edit, and delete.',
    author: 'User',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    views: 28,
  },
  {
    id: 3,
    title: 'Next.js with Tailwind CSS',
    content: 'This project uses Next.js 14, TypeScript, Tailwind CSS, and Supabase for database management.',
    author: 'Developer',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    views: 15,
  },
]

let nextId = 4

export async function getAllPosts(): Promise<Post[]> {
  // 시뮬레이션을 위한 약간의 지연
  await new Promise(resolve => setTimeout(resolve, 100))
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getPostById(id: number): Promise<Post | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const post = posts.find(p => p.id === id)
  if (post) {
    post.views += 1
  }
  return post
}

export async function createPost(input: CreatePostInput): Promise<Post | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const newPost: Post = {
    id: nextId++,
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
  }
  posts.push(newPost)
  return newPost
}

export async function updatePost(id: number, input: UpdatePostInput): Promise<Post | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return undefined

  const post = posts[index]
  const updatedPost = {
    ...post,
    ...(input.title && { title: input.title }),
    ...(input.content && { content: input.content }),
    ...(input.author && { author: input.author }),
    updatedAt: new Date(),
  }
  posts[index] = updatedPost
  return updatedPost
}

export async function deletePost(id: number): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return false

  posts.splice(index, 1)
  return true
}

export async function searchPosts(query: string): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const lowerQuery = query.toLowerCase()
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery)
  )
}
