"use client";

import UserButton from "@/components/auth/buttons/user-button";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { MobileNav } from "./mobile-nav";
import { navigationItems } from "./navigation";
import { styles } from "@/lib/styles";
import { APP_LOGO } from "@/lib/constants";

const NavItems = ({ type, user }: { type: 'mobile' | 'desktop', user: User | null }) => {
  const pathname = usePathname()

  if (type === 'mobile') {
    return (
      <MobileNav />
    )
  }

  return (
    <div className="hidden md:block">
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] ">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent">{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-5">
                          <NavigationMenuLink asChild>
                            <a
                              className={cn(styles.gradients.primary, "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md")}
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              <div className="mb-2 mt-4 text-lg font-bold">
                                {item.name}
                              </div>
                              <p className="text-sm leading-tight">
                                {item.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {item.items.map((subItem, subIndex) => (
                          <ListItem
                            key={subIndex}
                            title={subItem.title}
                            href={subItem.href}
                            icon={subItem.icon}
                          >
                            {subItem.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent',
                      item.featured && styles.gradients.text_highlight
                    )}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    
        <aside className="flex items-center">
        <UserButton userFromProps={user || null} />
        </aside>
      
    </div>
  )
}

const Navbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Check initial scroll position
    setScrollY(window.scrollY)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (callbackUrl === '/auth/mobile' || pathname.includes('/auth/mobile')) {
    return null;
  }

  return (
    <header className={`fixed right-0 left-0 top-0 py-4 px-4 z-[100] transition-colors duration-300 ${scrollY > 0 ? 'bg-black/5 backdrop-blur-lg border-b-[1px]' : 'bg-transparent  border-b-none'}`}>
      <div className="flex items-center justify-between max-w-[1900px] mx-auto">
        <aside className="flex items-center">
          {/* Logo/Name */}
          <div className="flex lg:ml-0 cursor-pointer">
            {/* Logo/Name */}
            <div className="flex lg:ml-0 cursor-pointer font-black py-1 rounded-sm">
              <Link href={'/'} className="flex flex-row justify-center items-center gap-2">
                <Image
                  src={APP_LOGO}
                  height="40"
                  width="40"
                  alt="footer-logo"
                  className='rounded-sm bg-white p-1.5'
                />
                <p>Next.js Marketplace</p>
              </Link>
            </div>
          </div>
        </aside>
        <NavItems type="desktop" user={user} />
        <NavItems type="mobile" user={user} />
      </div>
    </header>
  )
};

export default Navbar

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ",
            !props?.href ? '' : 'hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          target={props.href?.startsWith('http') ? '_blank' : undefined}
          rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          <div className="text-sm font-medium leading-none">

            <div className="flex justify-start mt-1 items-center gap-2">
              {icon}
              {title}
            </div>

          </div>

          <p className="line-clamp-4 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
