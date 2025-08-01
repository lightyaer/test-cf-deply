import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { signIn } = useAuthActions()

  const onSignIn = () => {
    void signIn('google', { redirectTo: '/' })
  }

  return (
    <main className="p-8 flex flex-col gap-16">
      <h1>Hello World</h1>

      <button onClick={onSignIn}>Sign In</button>
    </main>
  )
}
