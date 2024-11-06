import { generateURLParams } from "../components/geterateUrlParams"


export function generateTelegramLink(text: string) {
  return 'https://t.me/share/url?' + generateURLParams(['url', window.location.href], ['text', text]).toString()
}
