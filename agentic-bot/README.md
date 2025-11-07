## Agentic Telegram Bot

A minimal Telegram webhook bot built with Next.js App Router and ready to deploy on Vercel.

### 1. Configure environment

```bash
cp .env.example .env.local
```

Edit the file (or add the variable in your Vercel dashboard) with:

```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

The token comes from [`@BotFather`](https://t.me/BotFather).

### 2. Run locally

```bash
npm install
npm run dev
```

Telegram requires a public HTTPS URL for webhooks. While developing, expose your dev server with a tunnel of your choice (e.g. `ngrok http 3000`) and set the webhook to the forwarded URL.

### 3. Deploy & set the webhook

After deploying to Vercel, register the webhook:

```bash
curl -X POST https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook \
  -d url=https://agentic-1b7df268.vercel.app/api/telegram
```

Replace the URL with your own deployment if different. Telegram will now push updates directly to your Next.js API route.

### Extending the bot

- Modify `src/app/api/telegram/route.ts` to adjust webhook behaviour.
- Use `src/lib/telegram.ts` as the lightweight helper for other Telegram API calls.
- Update `src/app/page.tsx` to customize the dashboard content.

Happy building!
