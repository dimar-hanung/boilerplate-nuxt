# Nuxt Dashboard Boilerplate

A modern admin dashboard boilerplate built with Nuxt 4, TailwindCSS, and shadcn-vue components.

## Features

- ⚡ **Nuxt 4** - Latest Vue framework with SSR/SSG support
- 🎨 **TailwindCSS 4** - Utility-first CSS framework
- 📊 **Dashboard Layout** - Complete sidebar navigation system
- 🔐 **Login Page** - Authentication form with validation
- 🎯 **shadcn-vue Components** - Beautiful UI components (sidebar, dropdown, tooltip, etc.)
- 🌙 **Dark Mode** - Built-in theme toggle support
- 📱 **Responsive** - Mobile-friendly design

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
app/
├── components/
│   ├── ui/              # shadcn-vue UI components
│   │   ├── sidebar/     # Sidebar component system
│   │   ├── dropdown-menu/
│   │   ├── tooltip/
│   │   └── ...
│   ├── AppSidebar.vue   # Main sidebar layout
│   ├── LoginForm.vue    # Authentication form
│   └── ...
├── pages/
│   ├── login/           # Login page
│   └── dashboard/       # Dashboard page
└── app.vue             # Root component
```

## Available Routes

- `/login` - Authentication page
- `/dashboard` - Main dashboard with sidebar layout

## Tech Stack

- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [Reka UI](https://reka-ui.com/)
- [VueUse](https://vueuse.org/)
- [Lucide Icons](https://lucide.dev/)

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run generate # Static site generation
npm run preview  # Preview production build
```

---

Built with ❤️ using Nuxt and shadcn-vue
