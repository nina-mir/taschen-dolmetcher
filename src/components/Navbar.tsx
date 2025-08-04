"use client"

import * as React from "react"
// import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/Icons"

// import { Icons } from "@radix-ui/react-icons"
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
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="font-garamond-pp text-3xl bg-stone-300/80 max-w-full">
      <NavigationMenuList >
        <NavigationMenuItem >
          <NavigationMenuTrigger className="bg-transparent">History</NavigationMenuTrigger>
          <NavigationMenuContent className="hover:bg-transparent">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <p>On June-22-1941, Germany attacked the USSR. This fast invasion caught despot Joseph Stalin by surprise. 
                    But, the Soviet residents did not hide for 12 days like Stalin did.
                    The Soviet citizens mobilized. Their sacrifice on the frontlines and on the home front decided the ending of German fascists.
                   
                    This web game is an ode to the sacrifice, resilience and courage of ordinary Soviet citizens and Jewish fighters and the lasting impressions and memories of Vasily Grossman and Ilya Ehrenburg.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                <img src="https://camo.githubusercontent.com/c207e3fb3ee188b56a32c8acbdf6559d191d3c1f08a0913be2a5b78b3fd4c6b6/68747470733a2f2f61737365742e6d757365756d2d6469676974616c2e6f72672f2f6d656469612f3830302f6265726c696e2f696d616765732f33342f38303337322d3230373236332f3230373236332f3230373236332d38303337322e6a7067"/>
                <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none"
                    href="https://berlin.museum-digital.de/object/80372"
                  >
                
                    <p className="text-sm leading-tight text-muted-foreground">
                    <cite>
                  Hindersin, Bob. Taschen-Dolmetscher für Frontsoldaten Russisch.
                  Georg Siemens Verlagsbuchhandlung, 1943.
                </cite>  
                    </p>
                  </a>
                          
              </ListItem>
              <ListItem href="/docs/installation" title="Writers/Words">
              Many Soviet artists and writers also participated in this great effort.<em>Ilya Ehrenburg 
              and Vasily Grossman</em>, 
              two Jewish Ukranian-born writers, stand out for their coverage of the frontlines and inspiring words.   
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Game</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
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

