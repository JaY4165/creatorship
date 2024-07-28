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
import Link from "next/link";
import { changeNavAction } from "@/actions/navActions";
import { UserType } from "@prisma/client";
import UserAvatar from "./UserAvatar";

export type NavElementType = { title: string; href: string };
function Navbar() {
  const normalNav: NavElementType[] = [
    {
      title: "For Businesses",
      href: "/login",
    },
    {
      title: "For Creators",
      href: "/login",
    },
  ];

  const businessNav: NavElementType[] = [
    {
      title: "Applications",
      href: "/creator-applications",
    },
    {
      title: "Profile",
      href: "/business-profile",
    },
  ];

  const creatorNav: NavElementType[] = [
    {
      title: "Opportunities",
      href: "/opportunities",
    },
    {
      title: "Profile",
      href: "/creator-profile",
    },
  ];
  const [navElements, setNavElements] =
    React.useState<NavElementType[]>(normalNav);
  const [userAvatarType, setUserAvatarType] = React.useState<UserType | null>(
    null,
  );
  const [navEle, setNavEle] = React.useState<UserType | null | undefined>(null);

  React.useEffect(() => {
    const navToShow = async () => {
      const res: UserType | null | undefined = await changeNavAction();
      setNavEle(res);
      console.log(navEle);
      if (navEle !== undefined) {
        if (navEle === UserType.BUSINESS) {
          setUserAvatarType(UserType.BUSINESS);
          setNavElements(businessNav);
        } else if (navEle === UserType.CREATOR) {
          setUserAvatarType(UserType.BUSINESS);
          UserType.CREATOR;
          setNavElements(creatorNav);
        } else {
          setNavElements(normalNav);
        }
      }
    };
    navToShow();
  }, []);

  return (
    <header className="w-full">
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 border-gray-100 bg-opacity-40 px-14 backdrop-blur-lg backdrop-filter dark:border-opacity-10 max-md:px-3">
        <div className="text-xl font-semibold">
          <h1 className="uppercase">
            <Link href={"/"}>CreatorShip</Link>
          </h1>
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
                <div className="m-5">
                  <ModeToggle />
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center justify-center space-x-4 max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList className="space-x-5">
              {navElements.map((element) => (
                <NavItems key={element.title} element={element} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />

          <UserAvatar userAvatarType={userAvatarType} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
