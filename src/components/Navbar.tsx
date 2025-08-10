"use client"

import * as React from "react"
// import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/Icons"

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
    title: "Step.1 Choose languages!🧠",
    href: "/docs/primitives/alert-dialog",
    description:
      "Choose a from and to language option! Choose from German/English/Russian!",
  },
  {
    title: "Step.2 Multiple-choice OR typing? ⚓",
    href: "/docs/primitives/hover-card",
    description:
      "Choose between Multiple-Choice questions or typing-in your answer!",
  },
  {
    title: "Step.3 Submit your answer!✌🏽",
    href: "/docs/primitives/progress",
    description:
      "If your answer is correct, you'll see an image + interesting text of the war.",
  },
  {
    title: "Wong Answer?!❌",
    href: "/docs/primitives/scroll-area",
    description: "Anna Akhmatova and Boris Pasternak will tell you if your answer is wrong!",
  },
  {
    title: "Correct answer?🎈",
    href: "/docs/primitives/tabs",
    description:
      "You'll be rewarded with a piece of history: An image + a bit of text from the Eastern Front!",
  },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
]

export function NavigationMenuDemo() {
  // State management for the navigation menu
  const [activeMenu, setActiveMenu] = React.useState<string>("")

  // Handle menu item clicks
  const handleMenuClick = (menuValue: string) => {
    setActiveMenu(activeMenu === menuValue ? "" : menuValue)
  }

  // Handle click outside to close
  const handleValueChange = (value: string) => {
    setActiveMenu(value)
  }

  return (
    <NavigationMenu 
      className="font-garamond-pp bg-stone-300/80 max-w-full"
      value={activeMenu}
      onValueChange={handleValueChange}
    >
      <NavigationMenuList>
        <NavigationMenuItem value="history">
          <NavigationMenuTrigger 
            className=" text-lg data-[state=open]:bg-stone-300"
            onClick={() => handleMenuClick("history")}
            clickOnly={true}
          >
            History
          </NavigationMenuTrigger>
          <NavigationMenuContent 
          className="hover:bg-stone-300 bg-stone-300 border-0 focus:ring-0" clickOnly={true}>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild className="text-base">
                  <p>On June-22-1941, Germany attacked the USSR. This invasion caught despot Joseph Stalin by surprise. 
                    But, the Soviet residents did not hide for 12 days like Stalin did.
                    The Soviet citizens mobilized. Their sacrifice on the eastern front and on the home front decided the demise of German fascists.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                <img src="https://camo.githubusercontent.com/c207e3fb3ee188b56a32c8acbdf6559d191d3c1f08a0913be2a5b78b3fd4c6b6/68747470733a2f2f61737365742e6d757365756d2d6469676974616c2e6f72672f2f6d656469612f3830302f6265726c696e2f696d616765732f33342f38303337322d3230373236332f3230373236332f3230373236332d38303337322e6a7067"/>
                {/* <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none"
                    href="https://berlin.museum-digital.de/object/80372"
                  > */}
                    <cite>
                  Hindersin, Bob. Taschen-Dolmetscher für Frontsoldaten Russisch.
                  Georg Siemens Verlagsbuchhandlung, 1943.
                </cite>  
                  {/* </a>      */}
              </ListItem>
              <ListItem href="/docs/installation" title="Writers/Words">
              Many Soviet artists and writers also participated in this great effort.<em>Ilya Ehrenburg 
              and Vasily Grossman</em>, 
              two Jewish Ukranian-born writers, stand out for their coverage of the frontlines and inspiring words.   
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
              Adobe Fonts similar to New Yorker fontInspired by the B/W colors of WW2 and the ashes of Treblinka, a color palette was designed for this work.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
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
          className="hover:bg-stone-300 bg-stone-300 border-0 focus:ring-0" >
            {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"> */}
            <ul className="text-base grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="[&>*]:text-lg"
                  >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Further Readings
          </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
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