"use client";

import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import React from "react";
import { ModeToggle } from "./toggle-mode";
import NavItems from "./NavItems";

export type NavElementType = { title: string; href: string };
function Navbar() {
  const navElements: NavElementType[] = [
    {
      title: "For Businesses",
      href: "/businesses",
    },
    {
      title: "For Creators",
      href: "/creators",
    },
    {
      title: "Success Stories",
      href: "/success-stories",
    },
    {
      title: "How It Works",
      href: "/how-it-works",
    },
  ];
  return (
    <header className="w-full">
      <nav className="flex h-20 w-full items-center justify-between px-5 max-md:px-3">
        <div className="text-xl font-semibold">
          <h1 className="uppercase">CreatorShip</h1>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="h-full w-full">
                  <NavigationMenu className="mt-10">
                    <NavigationMenuList className="grid items-start gap-2">
                      {navElements.map((element) => (
                        <NavItems
                          key={element.title}
                          element={element}
                          classNames="items-start text-start first:mx-1"
                        />
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </SheetHeader>
              <SheetFooter className="">
                <div className="">
                  <ModeToggle />
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center justify-center space-x-4 max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              {navElements.map((element) => (
                <NavItems key={element.title} element={element} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
