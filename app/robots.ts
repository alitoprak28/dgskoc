import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

/**
 * Arama motoru ve yapay zeka tarayicilari. "*" zaten hepsini kapsiyor;
 * asagidaki liste izni acik ve okunur kilmak icin ayrica yaziliyor.
 * Google-Extended ve Applebot-Extended tarayici degil, egitim/ozet izni belirtecleridir.
 */
const yapayZekaTarayicilari = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "CCBot",
  "Bytespider",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: yapayZekaTarayicilari, allow: "/" },
    ],
    sitemap: `${site.alanAdi}/sitemap.xml`,
  };
}
