"""Отправляет заявку с сайта студии Стиль в Telegram-чат @Leyheo"""
import json
import os
import urllib.request
import urllib.parse


TELEGRAM_CHAT_ID = "@Leyheo"


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        service = body.get("service", "").strip()

        if not phone:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Укажите номер телефона"}),
            }

        text = (
            "🚗 *Новая заявка — Студия Стиль*\n\n"
            f"👤 Имя: {name or 'не указано'}\n"
            f"📞 Телефон: {phone}\n"
            f"🔧 Услуга: {service or 'не указана'}"
        )

        token = os.environ["TELEGRAM_BOT_TOKEN"]
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = json.dumps({
            "chat_id": TELEGRAM_CHAT_ID,
            "text": text,
            "parse_mode": "Markdown",
        }).encode("utf-8")

        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"ok": True}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": str(e)}),
        }
