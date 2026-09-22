'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">DemoBoard</h1>
          </Link>
          <p className="text-sm text-muted-foreground">A simple bulletin board system</p>
        </div>
        <Button asChild>
          <Link href="/posts/create">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>
    </header>
  )
}
