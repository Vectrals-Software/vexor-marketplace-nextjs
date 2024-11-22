"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { navigationItems } from "./navigation";

export const MobileNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex justify-end md:hidden">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger className="px-4 py-2">
          <RxHamburgerMenu />
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {navigationItems.map((item, index) => (
                item.items ? (
                  <AccordionItem key={index} value={item.name.toLowerCase()}>
                    <AccordionTrigger>{item.name}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className="text-md"
                              onClick={() => setIsDrawerOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      'block py-4',
                      item.featured && 'border mt-4 p-4 text-center relative'
                    )}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </Accordion>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}