import { buildLlmsFullTxt } from "@/lib/llms";

// Versión extendida de /llms.txt: descripciones completas, FAQs y artículos.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
