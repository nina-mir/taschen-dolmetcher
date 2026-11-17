import { useState } from 'react'
import { InfoItem, MediaItem } from '@/types'
import mediaData from '@/assets/data/imagesData_local.json'
import textData from '@/assets/data/infoData.json'
import ImageViewer from '@/components/question/ImageViewer'
import { useColumns } from '@/hooks/useColumns'
import { thumbUrl } from '@/utils/thumbUrl'

const photos = mediaData as MediaItem[]
const readings = textData as InfoItem[]

function shuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function sourceOf(reading: InfoItem): string | undefined {
  return reading.sourceChicago || reading.sourceAPA
}

/** A reading set large, between two rows of photographs. */
const Interlude: React.FC<{ reading: InfoItem }> = ({ reading }) => (
  <figure className="mx-auto my-10 max-w-3xl px-3 text-center md:my-16">
    <div className="mx-auto mb-5 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />
    <blockquote className="font-garamond-pp text-[1.35rem] italic leading-snug break-words md:text-3xl">
      {reading.text}
    </blockquote>
    {sourceOf(reading) && (
      <figcaption className="mt-4 font-gyst text-xs leading-relaxed text-stone-600 dark:text-stone-400">
        {sourceOf(reading)}
      </figcaption>
    )}
  </figure>
)

/**
 * Every photograph and reading from the game, without the quiz.
 * Rows of thumbnails alternate with one reading; tapping a thumbnail opens
 * the full-size photo with its caption.
 */
const Archive: React.FC = () => {
  const columns = useColumns()
  // A fresh random order of readings each time the archive is opened
  const [interludes] = useState<InfoItem[]>(() => shuffled(readings))

  const rows: MediaItem[][] = []
  for (let i = 0; i < photos.length; i += columns) {
    rows.push(photos.slice(i, i + columns))
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-3 pt-24 pb-16 md:pt-28">
      <header className="mx-auto mb-10 max-w-2xl px-2 text-center">
        <p className="mb-10 font-garamond-pp text-lg italic leading-snug text-stone-700 dark:text-stone-300 md:text-xl">
          In memory &amp; admiration of Vasily Grossman, Ilya Ehrenburg, and
          countless other poets fighting fascism.
        </p>
        <h1 className="font-gyst text-4xl font-semibold md:text-5xl">Archive</h1>
        <p className="mt-5 font-garamond-pp text-xl leading-relaxed md:text-2xl">
          On the Eastern Front, horror fell on people arbitrarily. The photographs
          and readings on this page are placed together the same way: nothing
          connects them except that each is a trace of what happened there.
        </p>
        <p className="mt-4 font-gyst text-sm text-stone-600 dark:text-stone-400">
          {photos.length} photographs · {readings.length} readings · tap a photograph to see it in full
        </p>
      </header>

      <section aria-label="Photographs and readings">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <ul
              className="grid list-none gap-1.5 p-0 md:gap-2"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {row.map((photo) => (
                <li key={photo.imgUrl}>
                  <ImageViewer
                    media={{ ...photo, altText: photo.altText || photo.imgCaption }}
                    thumbSrc={thumbUrl(photo.imgUrl)}
                    showExpandIcon={false}
                    triggerClassName="block aspect-square w-full overflow-hidden rounded-sm bg-stone-400/40"
                    imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </li>
              ))}
            </ul>

            {rowIndex < rows.length - 1 && interludes[rowIndex] && (
              <Interlude reading={interludes[rowIndex]} />
            )}
          </div>
        ))}
      </section>

      <section aria-labelledby="all-readings" className="mx-auto mt-20 max-w-2xl px-2">
        <h2 id="all-readings" className="font-gyst text-3xl font-semibold">All readings</h2>
        <ol className="mt-6 list-none p-0">
          {readings.map((reading, index) => (
            <li key={index} className="border-t border-stone-400/60 py-6 dark:border-stone-700">
              <p className="font-garamond-pp text-xl leading-relaxed break-words">{reading.text}</p>
              {sourceOf(reading) && (
                <cite className="mt-2 block font-gyst text-xs not-italic leading-relaxed text-stone-600 dark:text-stone-400">
                  {sourceOf(reading)}
                </cite>
              )}
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-12 text-center font-garamond-pp text-xl">
        <a href="#/" className="underline underline-offset-4">Back to the game</a>
      </p>
    </main>
  )
}

export default Archive
