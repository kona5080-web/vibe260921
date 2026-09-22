# DemoBoard - Bulletin Board System

A modern, feature-rich bulletin board system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** with shadcn/ui components.

## Features

✨ **Core Features:**
- 📝 Create new posts with title, content, and author
- 👁️ View posts with automatic view counter
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 🔍 Search posts by title, content, or author
- 📱 Responsive design that works on all devices
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🌙 Dark mode support

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL + Real-time APIs

## Project Structure

```
demoboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (posts list)
│   │   └── posts/
│   │       ├── create/
│   │       │   └── page.tsx    # Create post page
│   │       └── [id]/
│   │           ├── page.tsx    # Post detail page
│   │           └── edit/
│   │               └── page.tsx # Edit post page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── card.tsx
│   │   ├── header.tsx          # Navigation header
│   │   ├── post-list.tsx       # Posts list component
│   │   └── post-form.tsx       # Post form component
│   ├── lib/
│   │   ├── posts.ts            # Post business logic
│   │   └── utils.ts            # Utility functions
│   ├── styles/
│   │   └── globals.css         # Global styles
│   └── types/
│       └── index.ts            # TypeScript types
├── public/                     # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd demoboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
   - Create a `.env.local` file in the project root
   - Add your Supabase URL and API key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
     ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Usage

### Creating a Post
1. Click the "New Post" button in the header
2. Fill in the title, author name, and content
3. Click "Save Post"

### Viewing Posts
- The home page displays all posts sorted by creation date (newest first)
- Click on any post to view its full content
- Each post shows view count, author, and creation date

### Editing a Post
1. Click on a post to view its details
2. Click the edit icon (pencil)
3. Modify the content and click "Save Post"

### Deleting a Post
1. Click on a post to view its details
2. Click the delete icon (trash)
3. Confirm the deletion

### Searching Posts
- Use the search bar on the home page
- Search works across post titles, content, and author names

## Component Breakdown

### UI Components (`src/components/ui/`)
- **Button**: Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- **Input**: Standard text input field with focus states
- **Textarea**: Multi-line text input for post content
- **Card**: Container component for post display and forms

### Feature Components (`src/components/`)
- **Header**: Navigation bar with "New Post" button
- **PostList**: Displays grid of all posts with preview information
- **PostForm**: Reusable form for creating and editing posts

### Pages (`src/app/`)
- **Home** (`page.tsx`): Lists all posts with search functionality
- **Create Post** (`posts/create/page.tsx`): Form to create new posts
- **Post Detail** (`posts/[id]/page.tsx`): Full post view with edit/delete options
- **Edit Post** (`posts/[id]/edit/page.tsx`): Form to edit existing posts

## Data Management

This application uses **Supabase** (PostgreSQL-based) for data persistence. All post operations are stored in a remote database.

### Database Schema

The application uses a `posts` table with the following columns:
- `id` (BIGSERIAL) - Primary key
- `title` (VARCHAR) - Post title
- `content` (TEXT) - Post content
- `author` (VARCHAR) - Author name
- `views` (INTEGER) - View counter
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Setup Instructions

1. **Create Supabase Account**: Visit https://supabase.com and create a free account
2. **Create Project**: Create a new Supabase project
3. **Set Up Database**: Run the SQL schema from `supabase_schema.sql`
4. **Configure Environment**: Add your Supabase credentials to `.env.local`

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

## Styling

The project uses **Tailwind CSS** for styling with a comprehensive configuration:
- Dark mode support via CSS variables
- Semantic color system (primary, secondary, destructive, etc.)
- Responsive design with mobile-first approach
- Custom radius and spacing configuration

### Customizing Colors

Edit `tailwind.config.ts` and `src/styles/globals.css` to customize the color scheme.

## Performance Optimizations

- ✅ Server-side rendering with Next.js
- ✅ Image optimization with Next.js Image component
- ✅ CSS-in-JS with Tailwind (no runtime overhead)
- ✅ Code splitting and lazy loading
- ✅ TypeScript for type safety and early error detection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to fork, modify, and improve this project!

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Post categories/tags
- [ ] Comments on posts
- [ ] Post likes/reactions
- [ ] Pagination
- [ ] Rich text editor for post content
- [ ] File upload support
- [ ] Database integration
- [ ] API documentation

## Support

For issues or questions, please open an issue in the repository.

---

**Happy coding!** 🚀
