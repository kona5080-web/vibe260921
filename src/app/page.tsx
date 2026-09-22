'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { PostList } from '@/components/post-list'
import { Input } from '@/components/ui/input'
import { Post } from '@/types'
import { getAllPosts, searchPosts } from '@/lib/posts'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true)
      const allPosts = await getAllPosts()
      setPosts(allPosts)
      setIsLoading(false)
    }
    loadPosts()
  }, [])

  useEffect(() => {
    async function handleSearch() {
      if (searchQuery.trim() === '') {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
      } else {
        const results = await searchPosts(searchQuery)
        setPosts(results)
      }
    }
    handleSearch()
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search posts by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </div>
  )
}
