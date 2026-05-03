import * as React from "react"
import { cn } from "@/lib/utils"
import ScoreTracker from "@/components/ScoreTracker"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Step.1 Choose languages! 🧠",
    href: "#",
    description: "Choose a from and to language option! Choose from German/English/Russian!",
  },
  {
    title: "Step.2 Multiple-choice OR typing? ⚓",
    href: "#",
    description: "Choose between Multiple-Choice questions or typing-in your answer!",
  },
  {
    title: "Step.3 Submit your answer! ✌🏽",
    href: "#",
    description: "If your answer is correct, you'll see an image + interesting text of the war.",
  },
  {
    title: "Wrong Answer?! ❌",
    href: "#",
    description: "Anna Akhmatova and Boris Pasternak will tell you if your answer is wrong!",
  },
  {
    title: "Correct answer? 🎈",
    href: "#",
    description: "You'll be rewarded with a piece of history: An image + a bit of text from the Eastern Front!",
  },
]

interface NavigationMenuDemoProps {
  correct: number;
  incorrect: number;
}

export function NavigationMenuDemo({ correct, incorrect }: NavigationMenuDemoProps) {
  const [activeMenu, setActiveMenu] = React.useState<string>("")

  const handleMenuClick = (menuValue: string) => {
    setActiveMenu(activeMenu === menuValue ? "" : menuValue)
  }

  const handleValueChange = (value: string) => {
    setActiveMenu(value)
  }

  return (
    <NavigationMenu
      className="font-garamond-pp bg-stone-300/80 max-w-full justify-end"
      value={activeMenu}
      onValueChange={handleValueChange}
    >
      <div className="relative w-full">
        {/* Score tracker: absolutely centered in the navbar — desktop only */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="px-4 py-1 rounded-full bg-stone-200/70 border border-stone-400/40">
            <ScoreTracker correct={correct} incorrect={incorrect} variant="navbar" />
          </div>
        </div>

        <NavigationMenuList className="w-[100%]">
          {/* Left: History */}
          <NavigationMenuItem value="history">
            <NavigationMenuTrigger
              className="text-lg data-[state=open]:bg-stone-300"
              onClick={() => handleMenuClick("history")}
              clickOnly={true}
            >
              History
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="hover:bg-stone-300 bg-stone-300 border-0 focus:ring-0"
              clickOnly={true}
            >
              <div className="flex flex-col gap-4 p-6 md:w-[400px] lg:w-[500px] text-base font-garamond-pp">
                <p>
                  On June 22, 1941, Germany attacked the USSR. This invasion caught despot Joseph Stalin by surprise.
                  But the Soviet people did not hide for 12 days like Stalin did.
                  They mobilized. Their sacrifice on the eastern front and on the home front decided the demise of German fascism.
                </p>
                <p>
                  Many Soviet artists and writers participated in this great effort.
                  <em> Ilya Ehrenburg and Vasily Grossman</em>, two Jewish Ukrainian-born writers,
                  stand out for their coverage of the frontlines and their inspiring words.
                  This app is built around a 1943 German–Russian phrasebook issued to Wehrmacht soldiers —
                  a small artifact of a vast and brutal war, repurposed here as a language learning game.
                </p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Left: How to Play */}
          <NavigationMenuItem value="game">
            <NavigationMenuTrigger
              className="text-lg data-[state=open]:bg-stone-300"
              onClick={() => handleMenuClick("game")}
              clickOnly={true}
            >
              How to Play
            </NavigationMenuTrigger>
            <NavigationMenuContent
              clickOnly={true}
              className="hover:bg-stone-300 bg-stone-300 border-0 focus:ring-0"
            >
              <ul className="text-base grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    className="[&>*]:text-lg"
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Right: Storybook badge */}
          <NavigationMenuItem className="ml-auto">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="https://nina-mir.github.io/taschen-dolmetcher-storybook/"
              target="_blank"
            >
              <img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg" alt="Storybook" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  )
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
  )
})
ListItem.displayName = "ListItem"

export default ListItem;
