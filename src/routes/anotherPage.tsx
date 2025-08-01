import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { useAction } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getBindings } from '~/utils/bindings'

const getEnvVars = createServerFn().handler(async () => {
  const bindings = getBindings()

  return bindings
})

export const Route = createFileRoute('/anotherPage')({
  component: AnotherPage,
  loader: () => getEnvVars(),
})

function AnotherPage() {
  const envVars = Route.useLoaderData()

  const callMyAction = useAction(api.myFunctions.myAction)

  const { data } = useSuspenseQuery(
    convexQuery(api.myFunctions.listNumbers, { count: 10 }),
  )

  return (
    <main className="p-8 flex flex-col gap-16">
      <h1 className="text-4xl font-bold text-center">
        Convex + Tanstack Start
      </h1>
      <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <p>Numbers: {data.numbers.join(', ')}</p>
        <p>Click the button below to add a random number to the database.</p>
        <p>
          <button
            className="bg-dark dark:bg-light text-light dark:text-dark text-sm px-4 py-2 rounded-md border-2"
            onClick={() => {
              callMyAction({
                first: Math.round(Math.random() * 100),
              }).then(() => alert('Number added!'))
            }}
          >
            Call action to add a random number
          </button>
        </p>
        <div>{import.meta.env.VITE_CONVEX_URL}</div>
        <div>{import.meta.env.VITE_CONVEX_HTTP_ACTION_URL}</div>
        <div>{import.meta.env.VITE_SLACK_CLIENT_ID}</div>

        <div> env vars here</div>

        <pre>{JSON.stringify(envVars, null, 2)}</pre>

        <a href="/" className="text-blue-600 underline hover:no-underline">
          Back
        </a>
      </div>
    </main>
  )
}
