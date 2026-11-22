import { cn } from "@/lib/utils"

interface FooterLink {
  label: string;
  href: string;
  /** Opens in a new tab. Leave off for links inside the app and mailto. */
  external?: boolean;
}

const LINKS: FooterLink[] = [
  { label: "Archive", href: "#/archive" },
  { label: "Sources", href: "#/sources" },
  { label: "Source code", href: "https://github.com/nina-mir/taschen-dolmetcher", external: true },
  { label: "Storybook", href: "https://nina-mir.github.io/taschen-dolmetcher-storybook/", external: true },
  { label: "Teachers' note", href: "https://github.com/nina-mir/taschen-dolmetcher/blob/main/docs/TEACHERS.md", external: true },
  { label: "Twitter", href: "https://twitter.com/transbelly_nina", external: true },
  { label: "Contact", href: "mailto:Nina@SFSU.Edu" },
]

const START_YEAR = 2025

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const thisYear = new Date().getFullYear()
  const years = thisYear > START_YEAR ? `${START_YEAR}–${thisYear}` : `${START_YEAR}`

  return (
    <footer className={cn("w-full bg-stone-950 text-stone-300", className)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pt-9 pb-8 md:gap-7 md:px-8 md:pt-12 md:pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-1.5 font-garamond-pp">
            <span className="text-2xl leading-tight text-stone-50 md:whitespace-nowrap md:text-3xl">
              Taschen-Dolmetscher, Revisited
            </span>
            <span className="text-xl">
              by{" "}
              <a
                href="https://nina-mir.github.io/words/"
                className="text-soviet-gold underline underline-offset-4 hover:text-yellow-200"
              >
                Nina Ruth Mir
              </a>
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="grid list-none grid-cols-2 gap-x-6 p-0 md:grid-cols-3 md:gap-x-10">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-11 items-center font-gyst text-[0.95rem] font-medium underline decoration-stone-500 underline-offset-[5px] hover:text-white hover:decoration-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-px bg-stone-700" aria-hidden="true" />

        <div className="flex flex-col gap-2 font-garamond-pp text-base leading-snug text-stone-400">
          <p>
            Photographs and texts courtesy of the archives and publishers listed in{" "}
            <a href="#/sources" className="underline underline-offset-4 hover:text-white">Sources</a>.
          </p>
          {/* Copyright stays the last line of the page */}
          <p>&copy; {years} &middot; San Francisco, USA</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
