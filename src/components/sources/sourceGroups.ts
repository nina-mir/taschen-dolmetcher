import mediaData from '@/assets/data/imagesData_local.json'
import wrongData from '@/assets/data/wrongAnswerImages.json'
import textData from '@/assets/data/infoData.json'
import { InfoItem, MediaItem } from '@/types'

/** Readable names for the sites the photographs come from. */
const ARCHIVE_NAMES: Record<string, string> = {
  'infocenters.co.il': 'Ghetto Fighters’ House Archive',
  'russiainphoto.ru': 'Russia in Photo',
  'ww2abc.com': 'WW2 ABC',
  'culture.ru': 'Culture.RF (Культура.РФ)',
  'iwm.org.uk': 'Imperial War Museums',
  'gettyimages.ie': 'Getty Images',
  'gettyimages.com': 'Getty Images',
  'nailyaalexandergallery.com': 'Nailya Alexander Gallery',
  'yadvashem.org': 'Yad Vashem',
  'encyclopedia.ushmm.org': 'United States Holocaust Memorial Museum',
  'hoodmuseum.dartmouth.edu': 'Hood Museum of Art, Dartmouth College',
  'media.un.org': 'United Nations Photo',
  'en.wikipedia.org': 'Wikipedia',
  'ru.wikipedia.org': 'Wikipedia',
  'scma.smith.edu': 'Smith College Museum of Art',
  'library.georgetown.edu': 'Georgetown University Library',
  'daviscenter.fas.harvard.edu': 'Davis Center, Harvard University',
}

const OTHER = 'Other sources'

export interface PhotoEntry {
  caption: string;
  /** Photographer, credit line and holding archive, where the data has them. */
  credits: string[];
  /** Link to the page the photo came from, if it is a link. */
  url?: string;
  /** A published source given as a citation instead of a link. */
  citation?: string;
  /** Shown after a wrong answer rather than a right one. */
  wrongAnswer?: boolean;
}

export interface PhotoGroup {
  name: string;
  photos: PhotoEntry[];
}

export interface ReadingGroup {
  citation: string;
  passages: string[];
  worldCatLink?: string;
  googleBooksLink?: string;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function toEntry(photo: MediaItem & { credit?: string; originalArchive?: string }, wrongAnswer = false): [string, PhotoEntry] {
  const host = photo.sourceUrl ? hostOf(photo.sourceUrl) : null
  const credits = [photo.photog, photo.credit, photo.originalArchive].filter(
    (c): c is string => Boolean(c && c.trim()),
  )
  const entry: PhotoEntry = {
    caption: photo.imgCaption || 'Untitled photograph',
    credits,
    wrongAnswer,
    ...(host ? { url: photo.sourceUrl } : photo.sourceUrl ? { citation: photo.sourceUrl } : {}),
  }
  const name = host ? ARCHIVE_NAMES[host] ?? host : OTHER
  return [name, entry]
}

/** Every photograph in the game, grouped by archive, largest group first. */
export function photoGroups(): PhotoGroup[] {
  const groups = new Map<string, PhotoEntry[]>()
  const add = ([name, entry]: [string, PhotoEntry]) => {
    groups.set(name, [...(groups.get(name) ?? []), entry])
  }
  ;(mediaData as MediaItem[]).forEach((p) => add(toEntry(p)))
  ;(wrongData as MediaItem[]).forEach((p) => add(toEntry(p, true)))

  return [...groups.entries()]
    .map(([name, photos]) => ({ name, photos }))
    .sort((a, b) =>
      a.name === OTHER ? 1 : b.name === OTHER ? -1 : b.photos.length - a.photos.length || a.name.localeCompare(b.name),
    )
}

/** Every reading, grouped by the book it comes from, alphabetical by author. */
export function readingGroups(): ReadingGroup[] {
  const groups = new Map<string, ReadingGroup>()
  for (const reading of textData as InfoItem[]) {
    const citation = reading.sourceChicago || reading.sourceAPA || 'Source not recorded'
    const group = groups.get(citation) ?? {
      citation,
      passages: [],
      worldCatLink: reading.worldCatLink,
      googleBooksLink: reading.googleBooksLink,
    }
    group.passages.push(reading.text)
    groups.set(citation, group)
  }
  return [...groups.values()].sort((a, b) => a.citation.localeCompare(b.citation))
}

export const PHOTO_COUNT = mediaData.length + wrongData.length
export const READING_COUNT = textData.length
