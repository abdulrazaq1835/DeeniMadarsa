/**
 * Auto-translate text using the MyMemory free API.
 * No API key required for basic usage (up to 5000 chars/day per IP).
 * langPair examples: "en|hi", "en|ur"
 */
export async function autoTranslate(text: string, langPair: "en|hi" | "en|ur"): Promise<string> {
  if (!text.trim()) return "";
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation API error");
    const data = await res.json();
    const translated: string = data?.responseData?.translatedText ?? "";
    // MyMemory sometimes returns the original if it can't translate
    return translated || text;
  } catch {
    return text; // graceful fallback
  }
}

/** Translate both name and description fields at once */
export async function translateFields(
  fields: { name: string; description: string },
  lang: "hi" | "ur"
): Promise<{ name: string; description: string }> {
  const pair = lang === "hi" ? "en|hi" : "en|ur";
  const [name, description] = await Promise.all([
    autoTranslate(fields.name, pair),
    autoTranslate(fields.description, pair),
  ]);
  return { name, description };
}

/** Translate title + description (for announcements) */
export async function translateTitleDesc(
  fields: { title: string; description: string },
  lang: "hi" | "ur"
): Promise<{ title: string; description: string }> {
  const pair = lang === "hi" ? "en|hi" : "en|ur";
  const [title, description] = await Promise.all([
    autoTranslate(fields.title, pair),
    autoTranslate(fields.description, pair),
  ]);
  return { title, description };
}
