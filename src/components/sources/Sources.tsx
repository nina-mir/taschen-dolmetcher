import { ChevronDownIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { photoGroups, readingGroups, PHOTO_COUNT, READING_COUNT } from './sourceGroups'

const groupsOfPhotos = photoGroups()
const groupsOfReadings = readingGroups()

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

const sectionHeading = 'font-gyst text-3xl font-semibold'
const summaryRow =
  'flex cursor-pointer list-none items-start justify-between gap-4 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold [&::-webkit-details-marker]:hidden'
const countLabel =
  'shrink-0 pt-1 font-gyst text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400'
const chevron = 'h-5 w-5 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180'
const outLink =
  'inline-flex items-center gap-1 font-gyst text-sm font-medium underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400'

/**
 * Where every photograph and reading comes from. Each archive and each book
 * is a collapsible row showing its count; opening it lists the items.
 */
const Sources: React.FC = () => (
  <main className="mx-auto w-full max-w-2xl px-5 pt-24 pb-16 md:pt-28">
    <header className="mb-12">
      <h1 className="font-gyst text-4xl font-semibold md:text-5xl">Sources</h1>
      <p className="mt-4 font-garamond-pp text-xl leading-relaxed">
        Where the phrasebook, the {PHOTO_COUNT} photographs and the {READING_COUNT} readings in
        this project come from. Open an archive or a book to see what it contributed.
      </p>
    </header>

    <section aria-labelledby="sources-phrasebook" className="mb-14">
      <h2 id="sources-phrasebook" className={sectionHeading}>The phrasebook</h2>
      <p className="mt-4 font-garamond-pp text-xl leading-relaxed">
        <em>Taschen-Dolmetscher für Frontsoldaten</em>, a German–Russian phrasebook for Wehrmacht
        soldiers, first printed in Berlin in 1939 and reissued in 1941. A 1939 copy is held by the
        Museum Berlin-Karlshorst.
      </p>
      <p className="mt-3">
        <a
          href="https://berlin.museum-digital.de/object/80372"
          target="_blank"
          rel="noopener noreferrer"
          className={outLink}
        >
          Museum record <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </p>
    </section>

    <section aria-labelledby="sources-photos" className="mb-14">
      <h2 id="sources-photos" className={sectionHeading}>Photographs</h2>
      <p className="mt-2 font-gyst text-sm text-stone-600 dark:text-stone-400">
        {PHOTO_COUNT} photographs from {groupsOfPhotos.length} archives and collections
      </p>
      <div className="mt-4 border-b border-stone-400 dark:border-stone-600">
        {groupsOfPhotos.map((group) => (
          <details key={group.name} className="group border-t border-stone-400 dark:border-stone-600">
            <summary className={summaryRow}>
              <span className="min-w-0 font-garamond-pp text-xl leading-snug">{group.name}</span>
              <span className="flex shrink-0 items-start gap-2">
                <span className={countLabel}>{plural(group.photos.length, 'photograph', 'photographs')}</span>
                <ChevronDownIcon className={chevron} aria-hidden="true" />
              </span>
            </summary>
            <ol className="list-none p-0 pb-5">
              {group.photos.map((photo, i) => (
                <li key={i} className="border-t border-stone-300 py-3 dark:border-stone-700">
                  <p className="font-garamond-pp text-lg leading-snug">{photo.caption}</p>
                  {photo.credits.length > 0 && (
                    <p className="mt-1 font-gyst text-sm text-stone-600 dark:text-stone-400">
                      {photo.credits.join(' · ')}
                    </p>
                  )}
                  {photo.wrongAnswer && (
                    <p className="mt-1 font-gyst text-sm italic text-stone-600 dark:text-stone-400">
                      Shown after a wrong answer
                    </p>
                  )}
                  {photo.url && (
                    <a href={photo.url} target="_blank" rel="noopener noreferrer" className={`${outLink} mt-2`}>
                      View at source <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {photo.citation && (
                    <p className="mt-1 font-gyst text-sm text-stone-600 dark:text-stone-400">
                      Published in: {photo.citation}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </section>

    <section aria-labelledby="sources-readings" className="mb-14">
      <h2 id="sources-readings" className={sectionHeading}>Readings</h2>
      <p className="mt-2 font-gyst text-sm text-stone-600 dark:text-stone-400">
        {READING_COUNT} passages from {groupsOfReadings.length} books
      </p>
      <div className="mt-4 border-b border-stone-400 dark:border-stone-600">
        {groupsOfReadings.map((book) => (
          <details key={book.citation} className="group border-t border-stone-400 dark:border-stone-600">
            <summary className={summaryRow}>
              <span className="min-w-0 font-garamond-pp text-lg leading-snug break-words">{book.citation}</span>
              <span className="flex shrink-0 items-start gap-2">
                <span className={countLabel}>{plural(book.passages.length, 'passage', 'passages')}</span>
                <ChevronDownIcon className={chevron} aria-hidden="true" />
              </span>
            </summary>
            <div className="pb-5">
              {(book.worldCatLink || book.googleBooksLink) && (
                <p className="flex flex-wrap gap-x-5 gap-y-1 pb-3">
                  {book.worldCatLink && (
                    <a href={book.worldCatLink} target="_blank" rel="noopener noreferrer" className={outLink}>
                      Find in a library (WorldCat) <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {book.googleBooksLink && (
                    <a href={book.googleBooksLink} target="_blank" rel="noopener noreferrer" className={outLink}>
                      Google Books <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </p>
              )}
              <ol className="list-none p-0">
                {book.passages.map((passage, i) => (
                  <li key={i} className="border-t border-stone-300 py-3 dark:border-stone-700">
                    <p className="font-garamond-pp text-lg leading-relaxed break-words">{passage}</p>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        ))}
      </div>
    </section>

    <section aria-labelledby="sources-design" className="mb-14">
      <h2 id="sources-design" className={sectionHeading}>Design</h2>
      <p className="mt-4 font-garamond-pp text-xl leading-relaxed">
        The theme toggle&rsquo;s icons draw on <em>Beat the Whites with the Red Wedge</em>, a
        1919&ndash;20 poster by the Soviet artist El Lissitzky. Made during the Russian Civil War,
        it shows the Bolshevik Reds as a sharp red triangle driving into a white circle that stands
        for the White forces. Built only from flat colour and plain geometry, it became one of the
        defining images of Russian avant-garde design and shaped the visual language of Soviet
        posters for decades. Here the wedge and circle become a switch between day and night: in
        light mode a solid red wedge cuts into an empty circle, and in dark mode the circle turns
        solid gold and the wedge becomes an outline. The poster comes from the Civil War rather
        than the Second World War, but its graphic style carries into the posters and printed
        material of the 1940s that this project explores.
      </p>
      <p className="mt-3">
        <a
          href="https://collections.mfa.org/objects/314484"
          target="_blank"
          rel="noopener noreferrer"
          className={outLink}
        >
          The poster at the Museum of Fine Arts, Boston{' '}
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </p>
    </section>

    <p className="flex flex-col items-center gap-2 text-center font-garamond-pp text-xl">
      <a href="#/archive" className="underline underline-offset-4">See them in the Archive</a>
      <a href="#/" className="underline underline-offset-4">Back to the game</a>
    </p>
  </main>
)

export default Sources
