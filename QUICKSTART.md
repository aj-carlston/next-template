# Quick Start Guide

## Starting a New Project from Optivo Template

### Option 1: Using the Setup Script (Recommended)

1. **Clone the template:**
   ```powershell
   git clone https://github.com/aj-carlston/next-template.git my-new-app
   cd my-new-app
   ```

2. **Remove git history (start fresh):**
   ```powershell
   Remove-Item -Recurse -Force .git
   git init
   ```

3. **Run the setup script:**
   ```powershell
   .\setup.ps1
   ```
   
   The script will:
   - Guide you through Supabase configuration
   - Create your `.env.local` file
   - Optionally install dependencies

4. **Create admin user in Supabase:**
   - Go to your Supabase Dashboard
   - Navigate to Authentication → Users
   - Click "Add User"
   - Enter email and password
   - Click "Create user"

5. **Start developing:**
   ```powershell
   pnpm dev
   ```

### Option 2: Manual Setup

1. **Clone and setup:**
   ```powershell
   git clone https://github.com/aj-carlston/next-template.git my-new-app
   cd my-new-app
   Remove-Item -Recurse -Force .git
   git init
   ```

2. **Install dependencies:**
   ```powershell
   pnpm install
   ```

3. **Configure Supabase:**
   ```powershell
   # Copy the example file
   Copy-Item .env.example .env.local
   
   # Edit .env.local with your credentials
   notepad .env.local
   ```

4. **Create admin user in Supabase** (see step 4 above)

5. **Start the dev server:**
   ```powershell
   pnpm dev
   ```

## What's Included

✅ Complete UI component library (Button, Card, Input, Dropdown, Avatar)  
✅ Theme system with 6 variants  
✅ Supabase authentication ready  
✅ Route protection  
✅ Responsive header with navigation  
✅ Custom 404 page  
✅ TypeScript + SASS  

## First Steps After Setup

1. **Customize the branding:**
   - Edit logo in `src/components/layout/Header.tsx`
   - Update app name in `src/app/layout.tsx`

2. **Add your pages:**
   - Create new pages in `src/app/(pages)/`
   - Add navigation items in `Header.tsx`

3. **Choose your theme:**
   - Use the theme switcher (🎨 bottom right)
   - Or set default in `src/app/layout.tsx`

4. **Build your app!** 🚀

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.
