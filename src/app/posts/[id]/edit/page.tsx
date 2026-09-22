'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { PostForm } from '@/components/post-form'
import { Post } from '@/types'
import { getPostById, updatePost } from '@/lib/posts'

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const postId = parseInt(params.id)
      const foundPost = await getPostById(postId)
      if (foundPost) {
        // Reset views count for display
        setPost({ ...foundPost, views: foundPost.views - 1 })
      }
      setIsLoading(false)
    }
    loadPost()
  }, [params.id])

  async function handleSubmit(data: { title: string; content: string; author: string }) {
    const postId = parseInt(params.id)
    await updatePost(postId, data)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Post not found</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <PostForm post={post} onSubmit={handleSubmit} />
      </main>
    </div>
  )
}
