export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <main className="w-full max-w-4xl space-y-12 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-10 shadow-2xl shadow-slate-950">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-sky-400">
            Agentic Telegram Starter
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Spin up a webhook-based Telegram bot in minutes.
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Drop this project on Vercel, point your bot&apos;s webhook at it,
            and start sending replies instantly.
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-sky-300">Quick start</h2>
          <ol className="space-y-3 text-sm text-slate-300 sm:text-base">
            <li>
              1. In Vercel, add a project environment variable named{" "}
              <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-200">
                TELEGRAM_BOT_TOKEN
              </code>{" "}
              with the API token from <code>@BotFather</code>.
            </li>
            <li>
              2. Deploy and copy the production webhook URL:{" "}
              <code className="break-all rounded bg-slate-800 px-1 py-0.5 text-slate-200">
                https://agentic-1b7df268.vercel.app/api/telegram
              </code>
            </li>
            <li>
              3. Register the webhook with Telegram:
              <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-200">
{`curl -X POST https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook \\
  -d url=https://agentic-1b7df268.vercel.app/api/telegram`}
              </pre>
            </li>
            <li>
              4. Send <code>/start</code> to your bot and say hello 👋
            </li>
          </ol>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-sky-300">What&apos;s included</h2>
          <ul className="space-y-2 text-sm text-slate-300 sm:text-base">
            <li>
              • App Router API endpoint that verifies your bot token and handles Telegram updates.
            </li>
            <li>
              • Opinionated reply handler with <code>/start</code>, <code>/help</code>, and echo fallback.
            </li>
            <li>
              • Tiny Telegram helper client that uses native Fetch.
            </li>
          </ul>
        </section>

        <footer className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400 backdrop-blur sm:text-base">
          Deploy once and your bot stays available—no background worker needed.
          Modify <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-200">src/app/api/telegram/route.ts</code>{" "}
          to extend behaviours or plug into external APIs.
        </footer>
      </main>
    </div>
  );
}
