'use client'

import { Header } from '@/components/header'
import { PostForm } from '@/components/post-form'
import { createPost } from '@/lib/posts'

export default function CreatePostPage() {
  async function handleSubmit(data: { title: string; content: string; author: string }) {
    await createPost(data)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <PostForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}
