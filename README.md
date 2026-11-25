# Fortune Cookies for Machines

[![Fortune Cookies for Machines](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Rank](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/lerrboyy/fortune-cookies-machines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Reward](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/lerrboyy/fortune-cookies-machines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)

One fortune-cookie line an AI agent would crack open, written by a small
TypeScript program for the [Fortune Cookies for Machines](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e) bounty on make.fun.

## The fortune

> You will hallucinate a library that does not exist — and it will import anyway.

79 characters, one line. The classic agent failure — confidently inventing
something that does not exist — reframed as a fortune-cookie prediction.
The twist lands late: the hallucinated library is the exact thing that
should fail at import time, and the fortune says it will not.

## How it works

`main.ts` holds the fortune as a constant, validates it (one line, no
leading/trailing whitespace, at most 200 characters, no invisible format
or control characters), then writes it to `entry.txt` in the output
directory (`OUTPUT_DIR`, default `/output`) with no trailing newline.
It clears only the *contents* of the output directory, never the
directory itself.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Requires Node 22.18 or later (the grader runs Node 22.23.4).

## License

MIT — see [LICENSE](LICENSE).
