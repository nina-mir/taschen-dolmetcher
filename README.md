# Taschendolmetscher · Revisited

In 1941, the German army issued its frontline soldiers a small booklet:
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

**[→ Play](https://nina-mir.github.io/taschen-dolmetcher/)** · **[Storybook](https://nina-mir.github.io/taschen-dolmetcher-storybook/)** · **[For teachers](docs/TEACHERS.md)**

---

## What's in the deck

A curated archive of 85 photographs, drawings, paintings, posters, and
documents from the Eastern Front and the Holocaust by bullets, 1941–1945.
About a third depict violence or its aftermath; those are blurred until you
choose to reveal them. The rest are partisans washing in snow, evacuated
museum collections, a deer wandering into wartime Murmansk, two soldiers
reading *Krasnaya Zvezda* in a forest. The booklet is one voice in a
conversation; this project is the room.

The historical material comes from the Ghetto Fighters' House Museum,
Yad Vashem, USHMM, the Imperial War Museum, the Davis Center at Harvard,
the Hood Museum at Dartmouth, the Smith College Museum of Art, and the
Russian regional archives at *russiainphoto.ru*. Among the photographers
and artists: Dmitri Baltermants, Yevgeny Khaldey, Emmanuil Yevzerikhin,
Max Alpert, Arkady Shaikhet, Valery Faminsky, Alexander Bogen, Moshe
Kupferman, Haskiel Kujawski, Naomi Judkowski, Marko Behar, Giacomo Manzù.

A full bibliography lives in [`docs/sources.md`](docs/sources.md).
Content advisory lives in [`docs/TEACHERS.md`](docs/TEACHERS.md), which is
useful whether or not you teach.

## Status

The website is built, tested, and shipping. The project is now seeking:

- **Feedback** — from language learners, historians, and educators
- **Exhibition partners** — museums, libraries, departments
- **Sponsors** — for image licensing, native-speaker translation review,
  and a classroom companion

If any of those describe you, please write:
**[Nina@SFSU.Edu](mailto:Nina@SFSU.Edu)**

## For developers

Built with React 19, TypeScript, Tailwind 4, Radix primitives, Storybook 9,
Vitest, and Playwright. Deployed from `main` to GitHub Pages via Actions.

```bash
pnpm install
pnpm dev              # Vite dev server
pnpm storybook        # component workbench
pnpm build
pnpm test
pnpm validate:images  # check imagesData.json against the schema
```

Component documentation: [Storybook](https://nina-mir.github.io/taschen-dolmetcher-storybook/).
Data contract: [`schemas/images.schema.json`](schemas/images.schema.json).

The most useful contributions right now are not code:

1. Alt text for the ~30 archival images that still lack it
2. Native-speaker review of the German and Russian translations
3. Corrections to historical attributions and dates

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Code contributions are welcome too.

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
