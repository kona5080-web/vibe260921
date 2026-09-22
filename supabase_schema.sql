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

-- Enable Row Level Security (optional but recommended)
-- ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
