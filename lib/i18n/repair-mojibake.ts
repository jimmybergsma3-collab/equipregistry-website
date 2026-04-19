const MOJIBAKE_SEQUENCE_RE =
  /(?:Ã[\u0080-\u00FF]|Â[\u0080-\u00FF]|â[\u0080-\u00FF]|Ð[\u0080-\u00FF]|Ñ[\u0080-\u00FF]|Ø[\u0080-\u00FF]|Ù[\u0080-\u00FF]|ï»¿)/;

const LATIN1_MOJIBAKE_ONLY_RE =
  /^[\u0000-\u007F\u0080-\u00BF\u00C2\u00C3\u00D0\u00D1\u00D8\u00D9\u00E2\u00EF]*$/;

const COMMON_REPLACEMENTS: Array<[string, string]> = [
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€¢", "•"],
  ["â€¦", "…"],
  ["Â¿", "¿"],
  ["Â¡", "¡"],
  ["Â«", "«"],
  ["Â»", "»"],
  ["Â ", " "],
  ["âš ï¸", "⚠️"],
];

function decodeUtf8FromLatin1(value: string) {
  const bytes = Uint8Array.from(Array.from(value, (char) => char.charCodeAt(0)));
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

export function repairMojibakeString(value: string) {
  let repaired = value;

  if (MOJIBAKE_SEQUENCE_RE.test(repaired) && LATIN1_MOJIBAKE_ONLY_RE.test(repaired)) {
    const decoded = decodeUtf8FromLatin1(repaired);

    if (decoded && !decoded.includes("\uFFFD")) {
      repaired = decoded;
    }
  }

  for (const [from, to] of COMMON_REPLACEMENTS) {
    if (repaired.includes(from)) {
      repaired = repaired.split(from).join(to);
    }
  }

  return repaired;
}

export function repairMojibakeDeep<T>(value: T): T {
  if (typeof value === "string") {
    return repairMojibakeString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => repairMojibakeDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, repairMojibakeDeep(item)])
    ) as T;
  }

  return value;
}
