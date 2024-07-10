import * as React from "react"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const aboutUs: { title: string; href: string; description: string }[] = [
  {
    title: 'About CPUSA',
    href: '/about/cpusa',
    description: 'About the Communist Party of America'
  },
  {
    title: 'About CMCC',
    href: '/about/cmcc',
    description: 'About the Charlotte Metro Communist Club'
  },
]

const blogLoggedOut: { title: string; href: string; description: string }[] = [
  {
    title: 'Read',
    href: '/blog/grid',
    description: 'View blog posts'
  },
  {
    title: 'Search',
    href: '/blog/search',
    description: 'Search Blog Posts'
  },
  {
    title: 'Login',
    href: '/blog/login',
    description: 'Login/Register'
  },
]

const blogLoggedIn: { title: string; href: string; description: string }[] = [
  {
    title: 'Read',
    href: '/blog/grid',
    description: 'View blog posts'
  },
  {
    title: 'Search',
    href: '/blog/search',
    description: 'Search Blog Posts'
  },
  {
    title: 'New',
    href: '/blog/new',
    description: 'Create a Blog Post'
  },
  {
    title: 'Update',
    href: '/blog/update',
    description: 'Update a Blog Post'
  },
]

const bookClub: { title: string; href: string; description: string }[] = [
  {
    title: 'Reform or Revolution',
    href: '/book-club/RoR',
    description: 'Reform or Revolution notes'
  }
]

let loggedIn = false;
document.cookie.split(";")
    .map(str => str.trim().split(/=(.+)/))
    .forEach((cookie) => {
      if (cookie[0] === 'jwt') {
        loggedIn = true;
      }
    });
const blogs = loggedIn ? blogLoggedIn : blogLoggedOut;
 
export function NavBar() {
  // flex select-none rounded-md bg-gradient-to-b from-muted/50 to-muted p-1 no-underline outline-none focus:shadow-md
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <a className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group" 
            href="/"
            >Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {aboutUs.map((component) => (
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
        <NavigationMenuLink>
            <a className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group" 
            href="/calendar"
            >Calendar</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {blogs.map((component) => (
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
          <NavigationMenuTrigger>Book Club</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {bookClub.map((component) => (
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
      </NavigationMenuList>
    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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