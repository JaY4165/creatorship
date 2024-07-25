"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const path = usePathname();
  const matcher = path === "/login";
  const href = matcher ? "/sign-up" : "/login";
  const link = matcher ? "Sign Up" : "Login";
  return (
    <header className="w-full">
      <nav className="flex h-10 w-full items-center justify-between px-12 max-md:px-3">
        <div className="text-xl font-semibold">
          <h1 className="uppercase">
            <Link href={"/"}>CreatorShip</Link>
          </h1>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={href} legacyBehavior passHref>
                  <Button variant={"link"}>{link}</Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
