import { NextResponse } from "next/server";
import { assertBotToken, sendMessage } from "@/lib/telegram";

interface TelegramUser {
  id: number;
  first_name?: string;
  username?: string;
}

interface TelegramChat {
  id: number;
  type: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  text?: string;
  date: number;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
}

function buildReply(message?: TelegramMessage) {
  if (!message || typeof message.chat?.id !== "number") {
    return null;
  }

  const text = message.text?.trim() ?? "";
  const name = message.from?.first_name ?? message.from?.username ?? "friend";

  if (text.startsWith("/start")) {
    return {
      chat_id: message.chat.id,
      text: `Hey ${name}! I'm ready to chat. Send /help to see what I can do.`,
    };
  }

  if (text.startsWith("/help")) {
    return {
      chat_id: message.chat.id,
      text:
        "Try sending any message and I'll echo it back.\n\n" +
        "Feel free to extend me in src/app/api/telegram/route.ts.",
    };
  }

  if (text.length > 0) {
    return {
      chat_id: message.chat.id,
      text: `You said: ${text}`,
    };
  }

  return {
    chat_id: message.chat.id,
    text: "I can echo whatever you send. Give it a try!",
  };
}

export async function POST(request: Request) {
  try {
    assertBotToken();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Server misconfiguration: missing TELEGRAM_BOT_TOKEN environment variable.",
      },
      { status: 500 },
    );
  }

  let update: TelegramUpdate;

  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const message = update.message ?? update.edited_message;
  const reply = buildReply(message);

  if (!reply) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendMessage(reply);
  } catch (error) {
    console.error("Failed to send Telegram message", error);
    return NextResponse.json(
      { ok: false, error: "Failed to deliver response." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      message:
        "Telegram bots receive updates via POST. Set this endpoint as your webhook target.",
    },
    { status: 200 },
  );
}
