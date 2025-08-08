import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SocialLink {
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface FooterProps {
  author?: {
    name: string;
    emoji?: string;
  };
  socialLinks?: SocialLink[];
  copyright?: {
    year?: number;
    location?: string;
  };
  sourceCode?: {
    url: string;
    text?: string;
  };
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  author = {
    name: "Nina Ruth Mir",
    emoji: "👷🏽‍♀️✂️💄"
  },
  socialLinks = [
    {
      url: "https://twitter.com/transbelly_nina",
      icon: TwitterLogoIcon,
      label: "Twitter"
    }
  ],
  copyright = {
    year: 2025,
    location: "San Francisco, USA"
  },
  sourceCode = {
    url: "https://github.com/nina-mir/taschen-dolmetcher",
    text: "Source code on GitHub."
  },
  height = "h-[16rem]",
  backgroundColor = "bg-stone-600",
  textColor = "text-stone-300",
  accentColor = "text-soviet-gold",
  className = ""
}) => {
  return (
    <footer className={cn(
      "w-full font-gyst text-2xl p-10",
      height,
      backgroundColor,
      className
    )}>
      <div className="relative">
        <div className="flex flex-col text-balance text-center text-md leading-loose text-muted-foreground md:text-center gap-1.5">
          <span className={textColor}>
            {author.emoji && (
              <span className="text-3lg bg-stone-500 rounded-l-full">
                {author.emoji}
              </span>
            )}
            &nbsp;by&nbsp;
            <span className={accentColor}>
              {author.name}
            </span>

            {/* Social Links */}
            {socialLinks.map((link, index) => (
              <span key={index}>
                <Separator
                  orientation="vertical"
                  className="border-2 border-white mx-[15px] h-3 text-amber-50 bg-white inline-block"
                />
                <a href={link.url} aria-label={link.label}>
                  <link.icon className="w-5 h-auto inline-block" />
                </a>
              </span>
            ))}

            <Separator
              orientation="vertical"
              className="border-2 border-white mx-[15px] h-3 text-amber-50 bg-white inline-block"
            />
            &copy; {copyright.year}

            {copyright.location && (
              <>
                <Separator
                  orientation="vertical"
                  className="border-2 border-white mx-[15px] h-3 text-amber-50 bg-white inline-block"
                />
                {copyright.location}
              </>
            )}
          </span>

          {sourceCode && (
            <div className="flex flex-col justify-center items-center">

              <a
                href={sourceCode.url}
                className={` ${textColor}`}
                
                aria-label="View source code on GitHub"
              >

                <span >{sourceCode.text}</span>
                <GitHubLogoIcon className="inline-block w-7 h-auto text-red-600 bg-soviet-gold rounded-4xl" />

              </a>
            </div>

          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer;

// Usage examples:

// Default usage (maintains your current design):
// <Footer />

// Custom usage:
// <Footer
//   author={{
//     name: "John Doe",
//     emoji: "🚀"
//   }}
//   socialLinks={[
//     {
//       url: "https://twitter.com/johndoe",
//       icon: TwitterLogoIcon,
//       label: "Twitter"
//     },
//     {
//       url: "https://github.com/johndoe",
//       icon: GitHubLogoIcon,
//       label: "GitHub"
//     }
//   ]}
//   copyright={{
//     year: 2024,
//     location: "New York, USA"
//   }}
//   sourceCode={{
//     url: "https://github.com/johndoe/my-project",
//     text: "View on GitHub"
//   }}
//   backgroundColor="bg-slate-800"
//   textColor="text-slate-200"
//   accentColor="text-blue-400"
// />

// Minimal usage:
// <Footer
//   author={{ name: "Jane Smith" }}
//   socialLinks={[]}
//   sourceCode={undefined}
// />