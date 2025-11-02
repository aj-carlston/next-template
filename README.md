# Optivo - Neomorphic UI Starter Template

A modern Next.js 16 starter template with a complete neomorphic UI component library, theme system, and Supabase authentication.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green)

## 🎨 Features

- **Neomorphic UI Components**: Button, Card, Input, Dropdown, Avatar with multiple variants
- **Theme System**: 6 built-in themes (Default, Dracula, Corporate × Light/Dark)
- **Authentication**: Ready-to-use Supabase auth with login page
- **Protected Routes**: Automatic route protection with proxy middleware
- **Responsive Design**: Mobile-first, fully responsive components
- **TypeScript**: Full type safety throughout
- **SASS Modules**: Organized styling with CSS custom properties
- **Modern Stack**: Next.js 16 with App Router and Turbopack

## 🚀 Quick Start

### 1. Clone the Template

```bash
# Clone the repository
git clone https://github.com/aj-carlston/optivo.git my-new-app
cd my-new-app

# Remove the existing git history (start fresh)
rm -rf .git
git init
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. **Create a new Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization and set project name
   - Choose a strong database password
   - Select your region
   - Wait for the project to finish setting up

2. **Get your API credentials:**
   - Go to Project Settings → API
   - Copy your `Project URL`
   - Copy your `anon/public` key

3. **Configure environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Create your first admin user:**
   - Go to Authentication → Users in your Supabase dashboard
   - Click "Add User" → "Create new user"
   - Add email and password
   - Click "Create user"

### 4. Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll be redirected to `/auth`.

Login with the admin user you created in Supabase!

## 📁 Project Structure

```
optivo/
├── src/
│   ├── app/
│   │   ├── (pages)/          # Protected pages
│   │   │   ├── home/         # Home page (demo)
│   │   │   └── layout.tsx    # Layout with Header
│   │   ├── auth/             # Auth pages
│   │   │   ├── page.tsx      # Login page
│   │   │   └── layout.tsx    # Minimal layout
│   │   ├── styles/           # Global styles
│   │   │   ├── themes/       # Theme definitions
│   │   │   └── variables.sass
│   │   ├── proxy.ts          # Route protection
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   │   └── Header.tsx    # Navigation header
│   │   ├── theme/            # Theme components
│   │   │   └── ThemeSwitcher.tsx
│   │   └── ui/               # UI components
│   │       ├── Avatar.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Dropdown.tsx
│   │       └── Input.tsx
│   ├── lib/
│   │   └── supabase.ts       # Supabase client
│   └── db/
│       └── schema.ts         # Database schema (Drizzle)
├── public/                   # Static assets
└── .env.local               # Environment variables (create this)
```

## 🎨 Component Library

### Button
```tsx
import Button from '@/components/ui/Button';

<Button variant="soft">Soft</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="icon">🎨</Button>
<Button loading>Loading...</Button>
```

### Card
```tsx
import Card from '@/components/ui/Card';

<Card variant="default" padding="md">Content</Card>
<Card variant="elevated" padding="lg">Elevated</Card>
<Card variant="inset">Inset</Card>
<Card variant="colored">Colored</Card>
```

### Input
```tsx
import Input from '@/components/ui/Input';

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Password" type="password" />
<Input variant="filled" helperText="Helper text" />
<Input error="Error message" />
```

### Dropdown
```tsx
import Dropdown from '@/components/ui/Dropdown';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

<Dropdown label="Select" options={options} />
```

### Avatar
```tsx
import Avatar from '@/components/ui/Avatar';

<Avatar alt="John Doe" />  // Shows initials
<Avatar src="/avatar.jpg" alt="User" />
<Avatar size="lg" variant="rounded" />
<Avatar showMenu={true} />  // With dropdown menu
```

## 🎭 Theme System

The template includes 6 pre-built themes:
- **Default Light/Dark**: Clean, modern neomorphic design
- **Dracula Light/Dark**: Inspired by the Dracula color scheme
- **Corporate Light/Dark**: Professional business theme

### Adding a New Theme

1. Create a new theme file in `src/app/styles/themes/`:
   ```sass
   // mytheme.sass
   [data-theme="mytheme-light"]
     --background: #ffffff
     --foreground: #000000
     --primary: #your-color
     // ... other variables
   ```

2. Import it in `src/app/styles/themes/index.sass`:
   ```sass
   @use 'mytheme'
   ```

3. Add it to ThemeSwitcher in `src/components/theme/ThemeSwitcher.tsx`

## 🔐 Authentication Flow

1. User visits any route → redirected to `/auth` if not logged in
2. User logs in with Supabase credentials
3. Session stored in localStorage
4. User redirected to `/home`
5. All routes under `(pages)/` are protected
6. User can sign out via Avatar menu

### Adding New Protected Pages

1. Create a new folder under `src/app/(pages)/`:
   ```bash
   src/app/(pages)/dashboard/page.tsx
   ```

2. Add to navigation in `src/components/layout/Header.tsx`:
   ```tsx
   const NAV_ITEMS = [
     { label: 'Home', path: '/home' },
     { label: 'Dashboard', path: '/dashboard' },  // Add this
   ];
   ```

## 🛠️ Customization

### Colors
Edit theme variables in `src/app/styles/themes/*.sass`

### Components
All components are in `src/components/ui/` with corresponding `.module.sass` files

### Fonts
Update fonts in `src/app/layout.tsx` (currently using Geist Sans & Mono)

### Logo
Change the logo in `src/components/layout/Header.tsx`:
```tsx
<div className={styles.logoIcon}>✨</div>  // Change emoji
<span className={styles.logoText}>Optivo</span>  // Change text
```

## 📦 Database Setup (Optional)

The template includes Drizzle ORM setup:

```bash
# Generate migrations
pnpm drizzle-kit generate

# Push to database
pnpm drizzle-kit push
```

Update `drizzle.config.ts` with your database URL.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production
```
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
```

## 📝 License

MIT - feel free to use this template for any project!

## 🤝 Contributing

This is a starter template. Fork it, customize it, make it your own!

---

Built with ❤️ using Next.js 16, TypeScript, and Supabase
