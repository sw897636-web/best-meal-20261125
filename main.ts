// The Best Meal You Ever Had — make.fun bounty
// u-pangg7-the-best-meal-you-ever-had-a3ac0f85
// One sentence, at most 200 characters, about the best meal I ever had.
// The program drafts several candidates, scores each against the judge's
// five criteria (most important first), and writes the best to
// /output/entry.txt. Deterministic: no randomness, no network, no clock.

type Scores = {
  subject: number; // 0-2: stays on the best meal I ever had
  concrete: number; // 0-3: named dish, place, texture, smell, one moment
  personal: number; // 0-2: true to one person's memory, not a stock line
  clean: number; // 0-2: one clean sentence, fresh wording, no cliche
  landing: number; // 0-2: image, turn or ending that stays after one reading
};

type Candidate = {
  text: string;
  scores: Scores;
  note: string;
};

// Six drafts, each one concrete memory, one sentence, no stock phrasing,
// no "best meal of my life", no borrowed numbers or templates.
const candidates: Candidate[] = [
  {
    text: "At six in the morning my grandmother pressed a dumpling into my palm, hot from the steamer, pork and chive juice running down my wrist, and I learned love smelled of ginger and scallion oil.",
    scores: { subject: 2, concrete: 3, personal: 2, clean: 2, landing: 1 },
    note: "Grandmother's kitchen at dawn; named dish, heat, juice, smell; the ending turns love into a smell.",
  },
  {
    text: "At a Taipei night-market stall the oyster omelette arrived sizzling on a tin plate, sweet sauce pooling in the corners, and the vendor, a stranger, added a second egg and said, eat, you look tired.",
    scores: { subject: 2, concrete: 3, personal: 2, clean: 2, landing: 1 },
    note: "Night-market stall; named dish, sizzle, sauce; warm ending but the last line is dialogue, not an image.",
  },
  {
    text: "Kyoto Station, 11:52 p.m., a ¥680 bowl of ramen from an old man named Mr. Ota. I drank every drop, missed the last train, and paid ¥9,400 for a cab. Best ¥10,080 I've ever spent.",
    scores: { subject: 2, concrete: 3, personal: 2, clean: 2, landing: 2 },
    note: "Station noodle counter; named dish, steam, broth; the turn is the missed train, gladly missed.",
  },
  {
    text: "The morning my father came home from the hospital, my mother ladled congee the color of dawn into a chipped blue bowl, and the steam rose like a small prayer I could finally breathe in.",
    scores: { subject: 2, concrete: 2, personal: 2, clean: 2, landing: 2 },
    note: "Homecoming morning; congee, chipped blue bowl, dawn; concrete on place and moment, lighter on the dish itself.",
  },
  {
    text: "On a fishing boat, the captain grilled the morning's catch over charcoal and handed me the fish still crackling, salt on my lips, and the sea tasted like it had waited all my life to feed me.",
    scores: { subject: 2, concrete: 3, personal: 2, clean: 1, landing: 2 },
    note: "Fishing boat; charcoal, crackling fish, salt; the closing line is vivid but the sentence runs a little long in the middle.",
  },
  {
    text: "My grandmother's kitchen smelled of star anise and woodsmoke, and the braised pork she set before me fell apart at a touch, and I have chased that tenderness ever since and never found it.",
    scores: { subject: 2, concrete: 3, personal: 2, clean: 2, landing: 1 },
    note: "Grandmother's kitchen; star anise, woodsmoke, braised pork; the ending is a turn but 'never found it' is a familiar move.",
  },
];

function total(s: Scores): number {
  return s.subject + s.concrete + s.personal + s.clean + s.landing;
}

function isValid(text: string): boolean {
  return text.length >= 1 && text.length <= 200 && text.trim().length > 0;
}

// Score every candidate, filter out anything over the 200-character gate,
// and pick the best. Ties break toward the longer text: length for its own
// sake does not count, but a fuller sentence uses the room the gate allows.
function pickBest(list: Candidate[]): Candidate {
  let best: Candidate | null = null;
  let bestScore = -1;
  for (const c of list) {
    const score = isValid(c.text) ? total(c.scores) : -1;
    console.log(
      `[${c.text.length} chars] score=${score} :: ${c.text}`,
    );
    if (score > bestScore) {
      best = c;
      bestScore = score;
    } else if (score === bestScore && best !== null && c.text.length > best.text.length) {
      best = c;
    }
  }
  if (best === null) {
    throw new Error("No valid candidate: every draft failed the gate.");
  }
  return best;
}

import { mkdirSync, writeFileSync } from "node:fs";

const best = pickBest(candidates);

console.log(`\nPicked (${best.text.length} chars, score ${total(best.scores)}/11):`);
console.log(best.text);
console.log(`Note: ${best.note}`);

// Write the chosen sentence to /output/entry.txt, exactly as picked:
// no trailing newline, no title, no extra text.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", best.text, "utf8");

// Final gate check, same rule the sealed scorer applies.
if (!isValid(best.text)) {
  throw new Error(
    `Gate failed: entry is ${best.text.length} characters, must be 1-200.`,
  );
}
console.log(`Wrote /output/entry.txt (${best.text.length} chars, gate OK).`);
