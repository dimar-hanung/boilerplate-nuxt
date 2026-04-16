<script setup lang="ts">
definePageMeta({
  title: "Better Auth Setup",
})

import { Copy, Check, ArrowRight, Database, Shield, UserPlus, Key, Terminal, Code, BookOpen } from "lucide-vue-next"
import ThemeToggle from "@/components/ThemeToggle.vue"

const copiedStep = ref<number | null>(null)

const steps = [
  {
    id: 1,
    title: "Install Dependencies",
    description: "Add better-auth and the PostgreSQL driver to your project.",
    icon: Terminal,
    language: "bash",
    code: `npm install better-auth pg`,
  },
  {
    id: 2,
    title: "Set Environment Variables",
    description: "Configure your database connection string in a .env file.",
    icon: Key,
    language: "env",
    code: `DATABASE_URL=postgresql://user:password@localhost:5432/mydb`,
  },
  {
    id: 3,
    title: "Configure Auth Server",
    description: "Create the better-auth instance in server/utils/auth.ts.",
    icon: Shield,
    language: "typescript",
    code: `import { betterAuth } from "better-auth"
import { username } from "better-auth/plugins"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
})`,
  },
  {
    id: 4,
    title: "Create Auth API Route",
    description: "Add the catch-all route at server/api/auth/[...all].ts.",
    icon: Code,
    language: "typescript",
    code: `export default defineEventHandler(async (event) => {
  const response = await auth.handler(toWebRequest(event))
  return sendWebResponse(event, response)
})`,
  },
  {
    id: 5,
    title: "Set Up Auth Client",
    description: "Initialize the client-side auth in app/lib/auth-client.ts.",
    icon: UserPlus,
    language: "typescript",
    code: `import { createAuthClient } from "better-auth/vue"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [usernameClient()],
})`,
  },
  {
    id: 6,
    title: "Create Auth Composable",
    description: "Add useAuthSession for convenient session access.",
    icon: Database,
    language: "typescript",
    code: `// app/composables/useAuthSession.ts
export const useAuthSession = () => {
  const { data: session, isPending, error } = useFetch('/api/auth/get-session')
  return { data: session, isPending, error }
}`,
  },
]

async function copyCode(stepId: number, code: string) {
  await navigator.clipboard.writeText(code)
  copiedStep.value = stepId
  setTimeout(() => {
    copiedStep.value = null
  }, 2000)
}
</script>

<template>
  <div class="page">
    <div class="accent-bar" />

    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>

    <main class="content">
      <header class="hero">
        <div class="badge">
          <BookOpen class="badge-icon" />
          <span>Setup Guide</span>
          <span class="badge-dot" />
          <span class="badge-count">{{ steps.length }} steps</span>
        </div>
        <h1 class="hero-title">
          Better Auth
          <span class="hero-accent">Setup</span>
        </h1>
        <p class="hero-desc">
          Follow these steps to configure authentication in your Nuxt application. Each step includes the exact code you need.
        </p>
      </header>

      <div class="steps">
        <div
          v-for="(step, i) in steps"
          :key="step.id"
          class="step"
          :style="{ '--i': i }"
        >
          <div class="step-rail">
            <div class="step-number">{{ step.id }}</div>
            <div v-if="i < steps.length - 1" class="step-line" />
          </div>

          <div class="step-body">
            <div class="step-badge">Step {{ step.id }}</div>

            <div class="step-header">
              <div class="step-icon">
                <component :is="step.icon" class="step-icon-svg" />
              </div>
              <div class="step-header-text">
                <h2 class="step-title">{{ step.title }}</h2>
                <p class="step-desc">{{ step.description }}</p>
              </div>
            </div>

            <div class="code-block">
              <div class="code-header">
                <div class="code-dots">
                  <span class="dot dot-red" />
                  <span class="dot dot-yellow" />
                  <span class="dot dot-green" />
                </div>
                <span class="code-lang">{{ step.language }}</span>
                <button
                  @click="copyCode(step.id, step.code)"
                  class="code-copy"
                  :aria-label="copiedStep === step.id ? 'Copied' : 'Copy code'"
                >
                  <Check v-if="copiedStep === step.id" class="h-3.5 w-3.5 text-emerald-400" />
                  <Copy v-else class="h-3.5 w-3.5" />
                  <span>{{ copiedStep === step.id ? 'Copied' : 'Copy' }}</span>
                </button>
              </div>
              <pre class="code-content"><code>{{ step.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <footer class="cta">
        <div class="cta-line" />
        <div class="cta-body">
          <h2 class="cta-title">Ready to go?</h2>
          <p class="cta-desc">Start using authentication in your app now.</p>
          <div class="cta-links">
            <NuxtLink to="/login" class="cta-primary">
              Go to Login
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink to="/dashboard" class="cta-secondary">
              Go to Dashboard
            </NuxtLink>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.accent-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, oklch(0.72 0.19 55), oklch(0.65 0.22 330), oklch(0.6 0.18 260));
  z-index: 100;
}

.page {
  min-height: 100vh;
  background-color: var(--background);
}

.content {
  max-width: 48rem;
  margin-inline: auto;
  padding: 5rem 1.5rem 6rem;
}

.hero {
  margin-bottom: 4rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid var(--border);
  background-color: var(--card);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.badge-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.badge-dot {
  width: 3px;
  height: 3px;
  border-radius: 9999px;
  background-color: var(--muted-foreground);
}

.badge-count {
  color: var(--foreground);
  font-weight: 600;
}

.hero-title {
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--foreground);
  margin-bottom: 1rem;
}

.hero-accent {
  background: linear-gradient(135deg, oklch(0.72 0.19 55), oklch(0.65 0.22 330));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--muted-foreground);
  max-width: 36rem;
}

.steps {
  display: flex;
  flex-direction: column;
}

.step {
  display: flex;
  gap: 1.25rem;
  animation: fadeSlideUp 0.5s ease both;
  animation-delay: calc(150ms + var(--i) * 90ms);
}

.step-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-number {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--primary-foreground);
  background-color: var(--primary);
  flex-shrink: 0;
}

.step-line {
  width: 2px;
  flex: 1;
  background-color: var(--border);
  margin: 0.5rem 0;
}

.step-body {
  padding-bottom: 2.5rem;
  flex: 1;
  min-width: 0;
}

.step-badge {
  display: none;
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
  margin-bottom: 0.5rem;
}

.step-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.step-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: var(--primary-foreground);
  flex-shrink: 0;
}

.step-icon-svg {
  width: 1rem;
  height: 1rem;
}

.step-title {
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--foreground);
  line-height: 1.4;
}

.step-desc {
  font-size: 0.875rem;
  color: var(--muted-foreground);
  line-height: 1.5;
  margin-top: 0.125rem;
}

.code-block {
  background-color: oklch(0.14 0.01 270);
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid oklch(1 0 0 / 8%);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-bottom: 1px solid oklch(1 0 0 / 8%);
}

.code-dots {
  display: flex;
  gap: 0.375rem;
}

.dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
}

.dot-red { background-color: oklch(0.65 0.2 25); }
.dot-yellow { background-color: oklch(0.75 0.15 85); }
.dot-green { background-color: oklch(0.65 0.17 145); }

.code-lang {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.625rem;
  font-weight: 500;
  color: oklch(0.52 0.01 270);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-left: 0.25rem;
}

.code-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-left: auto;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.6875rem;
  color: oklch(0.58 0.01 270);
  transition: all 0.15s ease;
  border: 1px solid oklch(1 0 0 / 10%);
  background: transparent;
  cursor: pointer;
}

.code-copy:hover {
  background-color: oklch(1 0 0 / 8%);
  color: oklch(0.85 0.01 270);
}

.code-content {
  padding: 1rem 1.25rem;
  margin: 0;
  overflow-x: auto;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.8125rem;
  line-height: 1.65;
  color: oklch(0.82 0.01 270);
  tab-size: 2;
}

.code-content code {
  font-family: inherit;
}

.cta {
  margin-top: 3rem;
  padding-top: 3rem;
}

.cta-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  margin-bottom: 2.5rem;
}

.cta-body {
  text-align: center;
}

.cta-title {
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
}

.cta-desc {
  font-size: 0.9375rem;
  color: var(--muted-foreground);
  margin-bottom: 1.5rem;
}

.cta-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, oklch(0.72 0.19 55), oklch(0.65 0.22 330));
  color: white;
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
}

.cta-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px oklch(0.55 0.18 280 / 30%);
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  color: var(--foreground);
  font-family: "Outfit", ui-sans-serif, system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  background-color: var(--card);
}

.cta-secondary:hover {
  background-color: var(--muted);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step {
    animation: none;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .hero-desc {
    font-size: 1rem;
  }

  .content {
    padding: 3.5rem 1.25rem 4rem;
  }

  .step-rail {
    display: none;
  }

  .step {
    gap: 0;
  }

  .step-badge {
    display: block;
  }

  .step-body {
    padding-bottom: 2rem;
  }

  .step-icon {
    display: none;
  }

  .code-content {
    font-size: 0.75rem;
    padding: 0.875rem 1rem;
  }
}
</style>