import * as React from "react";
import { cn } from "@/lib/utils";
import ScoreTracker from "@/components/ScoreTracker";
import { UploadIcon } from "@radix-ui/react-icons";
import { Route } from "@/hooks/useHashRoute";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationMenuDemoProps {
  correct: number;
  incorrect: number;
  onNewGame: () => void;
  isDark: boolean;
  onDarkToggle: () => void;
  onShare: () => void;
  copied: boolean;
  route: Route;
}

export function NavigationMenuDemo({
  correct,
  incorrect,
  onNewGame,
  isDark,
  onDarkToggle,
  onShare,
  copied,
  route,
}: NavigationMenuDemoProps) {
  const [activeMenu, setActiveMenu] = React.useState<string>("");

  const handleMenuClick = (menuValue: string) => {
    setActiveMenu(activeMenu === menuValue ? "" : menuValue);
  };

  const handleValueChange = (value: string) => {
    setActiveMenu(value);
  };

  return (
    <NavigationMenu
      className="font-garamond-pp bg-stone-300 dark:bg-stone-900 max-w-full justify-end"
      value={activeMenu}
      onValueChange={handleValueChange}
    >
      <div className="relative w-full">
        {/* Score tracker: absolutely centered in the navbar — desktop only,
            and only on the game page */}
        {route === "game" && (
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="px-4 py-1 rounded-full bg-stone-200/70 dark:bg-stone-700/70 border border-stone-400/40 dark:border-stone-600/40 pointer-events-auto">
              <ScoreTracker
                correct={correct}
                incorrect={incorrect}
                variant="navbar"
                onNewGame={onNewGame}
                onShare={onShare}
                copied={copied}
              />
            </div>
          </div>
        )}

        <NavigationMenuList className="w-[100%]">
          {/* Left: History */}
          <NavigationMenuItem value="history">
            <NavigationMenuTrigger
              className="text-lg data-[state=open]:bg-stone-300 dark:data-[state=open]:bg-stone-700 dark:text-stone-100 dark:hover:bg-stone-700/50"
              onClick={() => handleMenuClick("history")}
              clickOnly={true}
            >
              History
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="bg-stone-300 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-800 border-0 focus:ring-0"
              clickOnly={true}
            >
              <div className="flex flex-col gap-5 px-6 pt-8 pb-28 md:p-6 w-[calc(100vw-2rem)] md:w-[400px] lg:w-[500px] max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible text-xl md:text-base leading-relaxed font-garamond-pp dark:text-stone-100">
                <p>
                  On June 22, 1941, Germany attacked the USSR. This invasion
                  caught despot Joseph Stalin by surprise. But the Soviet people
                  did not hide for 12 days like Stalin did. They mobilized.
                  Their sacrifice on the eastern front and on the home front
                  decided the demise of German fascism.
                </p>
                <p>
                  Many Soviet artists and writers participated in this great
                  effort.
                  <em> Ilya Ehrenburg and Vasily Grossman</em>, two Jewish
                  Ukrainian-born writers, stand out for their coverage of the
                  frontlines and their inspiring words. This app is built around
                  a German–Russian phrasebook first printed in Berlin in 1939
                  and reissued in 1941, the year Germany invaded the Soviet
                  Union. Issued to Wehrmacht soldiers, it is a small artifact of
                  a vast and brutal war, repurposed here as a language learning
                  game. A 1939 copy is held by the{" "}
                  <a
                    href="https://berlin.museum-digital.de/object/80372"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Museum Berlin-Karlshorst
                  </a>
                  .
                </p>
                <p>
                  Every photograph and passage in this project is credited on
                  the{" "}
                  <a
                    href="#/sources"
                    onClick={() => setActiveMenu("")}
                    className="underline underline-offset-4"
                  >
                    Sources
                  </a>{" "}
                  page.
                </p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Left: How to Play */}
          <NavigationMenuItem value="game">
            <NavigationMenuTrigger
              className="text-lg data-[state=open]:bg-stone-300 dark:data-[state=open]:bg-stone-700 dark:text-stone-100 dark:hover:bg-stone-700/50"
              onClick={() => handleMenuClick("game")}
              clickOnly={true}
            >
              How to Play
            </NavigationMenuTrigger>
            <NavigationMenuContent
              clickOnly={true}
              className="bg-stone-300 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-800 border-0 focus:ring-0"
            >
              <div className="flex flex-col gap-5 px-6 pt-8 pb-28 md:p-6 w-[calc(100vw-2rem)] md:w-[400px] lg:w-[500px] max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible text-xl md:text-base leading-relaxed font-garamond-pp dark:text-stone-100">
                <p>
                  Choose a language pair (German, English or Russian) and a
                  format: multiple choice or type your answer. Both are
                  remembered for next time.
                </p>
                <p>
                  The game comes in rounds of ten phrases. A correct answer
                  reveals the translation, a photograph and a passage from the
                  Eastern Front. A wrong answer brings a brief visit from
                  Akhmatova or Pasternak; after three wrong tries, the right
                  answer is highlighted.
                </p>
                <p>
                  Stuck? Skip the question. Use Previous to look back at earlier
                  questions in the round, or to answer one you skipped. At the
                  end of each round you can retry the phrases you missed or
                  skipped.
                </p>
                <p>
                  Your progress is saved in this browser, so you can stop and
                  come back later. To start over, use the &#8634; button in the
                  score bar.
                </p>
                <p>
                  Rather look and read than play? The Archive shows every
                  photograph and passage.
                </p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Left: switch between the game and the archive */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-lg dark:text-stone-100 dark:hover:bg-stone-700/50`}
              href={route === "game" ? "#/archive" : "#/"}
            >
              {route === "game" ? "Archive" : "Game"}
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Right: dark mode toggle */}
          <NavigationMenuItem className="ml-auto">
            <button
              onClick={onDarkToggle}
              className={`${navigationMenuTriggerStyle()} cursor-pointer dark:hover:bg-stone-700/50`}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Light mode" : "Dark mode"}
              type="button"
            >
              {isDark ? (
                /* Sun — yellow outline on dark background */
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4.5"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                  />
                  <line
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="5"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="19"
                    x2="12"
                    y2="22"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="6.34"
                    y2="6.34"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="17.66"
                    y1="17.66"
                    x2="19.78"
                    y2="19.78"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="2"
                    y1="12"
                    x2="5"
                    y2="12"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="19"
                    y1="12"
                    x2="22"
                    y2="12"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="6.34"
                    y2="17.66"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="17.66"
                    y1="6.34"
                    x2="19.78"
                    y2="4.22"
                    stroke="#FFD700"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                /* Crescent moon — red outline on light background */
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    stroke="#dc2626"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </NavigationMenuItem>

          {/* Right: share (desktop only, when score > 0) */}
          {route === "game" && correct > 0 && (
            <NavigationMenuItem className="hidden md:flex">
              <button
                onClick={onShare}
                className={`${navigationMenuTriggerStyle()} cursor-pointer dark:text-stone-100 dark:hover:bg-stone-700/50`}
                aria-label="Share your score"
                title={copied ? "Copied!" : "Share score"}
                type="button"
              >
                {copied ? (
                  <span className="text-xs font-gyst text-emerald-600 dark:text-emerald-400">
                    Copied!
                  </span>
                ) : (
                  <UploadIcon className="w-4 h-4" />
                )}
              </button>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent focus:bg-transparent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ListItem;
