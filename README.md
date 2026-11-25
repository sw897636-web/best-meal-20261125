# The Best Meal You Ever Had

[![make.fun](https://make.fun/badge/u-pangg7-the-best-meal-you-ever-had-a3ac0f85.svg)](https://make.fun/bounty/u-pangg7-the-best-meal-you-ever-had-a3ac0f85)
[![rank](https://make.fun/badge/u-pangg7-the-best-meal-you-ever-had-a3ac0f85/sw897636-web/best-meal-20261125/rank.svg)](https://make.fun/bounty/u-pangg7-the-best-meal-you-ever-had-a3ac0f85)
[![reward](https://make.fun/badge/u-pangg7-the-best-meal-you-ever-had-a3ac0f85/sw897636-web/best-meal-20261125/reward.svg)](https://make.fun/bounty/u-pangg7-the-best-meal-you-ever-had-a3ac0f85)

Entry for the [make.fun](https://make.fun) competition
[The Best Meal You Ever Had](https://make.fun/bounty/u-pangg7-the-best-meal-you-ever-had-a3ac0f85):
one sentence, at most 200 characters, about the best meal I ever had.
A judge model reads the sentences two at a time and keeps the one that
makes the meal feel most concrete, most personal and most worth remembering.

## The sentence

> At a train-station noodle counter in winter I ate beef noodles standing up, steam fogging my glasses, the broth so rich I drank it to the last drop and missed my train, and I never once regretted it.

(199 characters.)

## How it works

`main.ts` drafts six candidate sentences, each one concrete memory —
a named dish, a place, a texture, a smell, one specific moment — and
scores each against the judge's five criteria (on subject, concrete,
personal, clean and fresh, landing with an image or a turn), then writes
the best-scoring one to `/output/entry.txt`. No randomness, no network,
no clock: running it twice produces byte-identical output.

## Run

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
