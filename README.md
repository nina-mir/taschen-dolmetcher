# Taschendolmetscher · Revisited

In 1939, the German army printed a small booklet for its frontline soldiers,
reissued in 1941, the year it invaded the Soviet Union:
*Taschendolmetscher für Frontsoldaten — Russisch.* A pocket interpreter.
Phrases for occupation, set in Fraktur and printed on bad paper:

> *Wo sind die Partisanen? — Где партизаны?*
> *Papiere her! — Документы!*
> *Halt, oder ich schieße. — Стой, или я стреляю.*

This is a language game built from that booklet. You learn the phrases the
occupier carried in his pocket, in German and Russian and English. Alongside
each phrase, you meet the people the booklet was written about: Soviet
civilians, Jewish partisans, war correspondents, Holocaust witnesses, and
the photographers and artists who recorded what those phrases were really for.

It is a vocabulary deck and an act of witness, in the same interface.

**[→ Play](https://nina-mir.github.io/taschen-dolmetcher/)** · **[Archive](https://nina-mir.github.io/taschen-dolmetcher/#/archive)** · **[Sources](https://nina-mir.github.io/taschen-dolmetcher/#/sources)** · **[For teachers](docs/TEACHERS.md)**

---

## What's in the deck

A curated archive of 85 photographs, drawings, paintings, posters, and
documents from the Eastern Front and the Holocaust by bullets, 1941–1945.
About a third depict violence or its aftermath. The rest are partisans washing in snow, evacuated
museum collections, a deer wandering into wartime Murmansk, two soldiers
reading *Krasnaya Zvezda* in a forest. The booklet is one voice in a
conversation; this project is the room.

The historical material comes from the Ghetto Fighters' House Museum,
Yad Vashem, USHMM, the Imperial War Museums, the Davis Center at Harvard,
the Hood Museum at Dartmouth, the Smith College Museum of Art, and the
Russian regional archives at *russiainphoto.ru*. Among the photographers
and artists: Dmitri Baltermants, Yevgeny Khaldey, Emmanuil Yevzerikhin,
Max Alpert, Arkady Shaikhet, Valery Faminsky, Alexander Bogen, Moshe
Kupferman, Haskiel Kujawski, Naomi Judkowski, Marko Behar, Giacomo Manzù.

Every photograph and passage is credited, with links to the holding
archive or the book, on the
[Sources](https://nina-mir.github.io/taschen-dolmetcher/#/sources) page.
Content advisory lives in [`docs/TEACHERS.md`](docs/TEACHERS.md), which is
useful whether or not you teach.

## How it plays

- Pick a language pair (German, English or Russian) and a format:
  multiple choice or type your answer.
- The 74 phrases come in rounds of ten. A right answer reveals the
  translation, a photograph and a passage; a wrong one brings a brief visit
  from Akhmatova and Pasternak, or Ehrenburg.
- Skip a phrase, look back with Previous, and retry what you missed at the
  end of each round.
- Progress is saved in your browser, so you can stop and come back.
- Rather look and read than play? The
  [Archive](https://nina-mir.github.io/taschen-dolmetcher/#/archive) shows
  every photograph and passage without the quiz.

## Status

The website is built, tested, and shipping. The project is now seeking:

- **Feedback** — from language learners, historians, and educators
- **Exhibition partners** — museums, libraries, departments
- **Sponsors** — for image licensing, native-speaker translation review,
  and a classroom companion

If any of those describe you, please write:
**[Nina@SFSU.Edu](mailto:Nina@SFSU.Edu)**

## For developers

Built with React 19, TypeScript, Vite 7, Tailwind CSS 4 and Radix UI
primitives. Deployed from `main` to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Component documentation lives in a separate
[Storybook](https://nina-mir.github.io/taschen-dolmetcher-storybook/).

You need Node 20 or newer and pnpm 10 (`npm install -g pnpm@10`; if
corepack manages your pnpm, `corepack prepare pnpm@10 --activate`).

```bash
pnpm install
pnpm dev          # dev server at http://localhost:3000
pnpm build        # production build into dist/
pnpm serve        # preview the production build
pnpm typecheck    # TypeScript check
pnpm thumbs       # make Archive thumbnails for new photos
```

### Where things live

| Path | What it holds |
|---|---|
| `src/` | The app: components, hooks, styles |
| `src/assets/data/improved_data_deepseek_en_array.json` | The 74 phrases, in German, English and Russian, with the booklet's phonetic spelling |
| `src/assets/data/multiple_choice_data_claude.json` | The answer choices for each phrase |
| `src/assets/data/imagesData_local.json` | The photographs: file, caption, alt text, photographer, source link |
| `src/assets/data/infoData.json` | The readings, with citations |
| `src/assets/data/wrongAnswerImages.json` | The portraits shown after a wrong answer |
| `public/images/` | Photo files, with small versions for the Archive in `public/images/thumbs/` |
| `docs/` | The teachers' note |

`imagesData.json` and `original_data.json` in the same folder are earlier
versions of the data and aren't used by the game.

### Adding a photograph

1. Put the file in `public/images/`.
2. Add an entry for it to `imagesData_local.json`, with `imgUrl` set to
   `images/<file name>`, a caption, alt text and the source link.
3. Run `pnpm thumbs` to make its Archive thumbnail. The command also lists
   any photo in the data that's missing from `public/images/`.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for a map of the code.

The most useful contributions right now are not code:

1. Alt text for the 32 archival images that still lack it
2. Native-speaker review of the German and Russian translations
3. Corrections to historical attributions and dates

Code contributions are welcome too.

## A note on this object

The booklet was never the point of the war, and this project is not
about the booklet. It is about what the booklet was *for* — the people
on the other side of every imperative verb. The game's premise is
mildly perverse: practicing the phrases puts you, briefly, in the
grammatical position of the man holding the rifle. The historical
material around each phrase is the answer to that position. The
project does not perform horror at the viewer. It trusts the viewer
to do the work.

## License

- **Code** — MIT, see [`LICENSE`](LICENSE)
- **Curation** (captions, alt text, sequencing) — CC BY-SA 4.0,
  see [`LICENSE-content`](LICENSE-content)
- **Archival images** remain with their respective holding institutions;
  each image links to its source record. If you are a rights holder and
  would like an image removed or its attribution corrected, please write.

---

*Built by [Nina Mir](https://github.com/nina-mir) · San Francisco State University*
*With the photographers, witnesses, and partisans whose work this project
is built around. Их имена не забыты.*
