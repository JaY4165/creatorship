import React from "react";
import { NavigationMenuItem } from "../ui/navigation-menu";
import Link from "next/link";
import { NavElementType } from "./Navbar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

function NavItems({
  element,
  classNames,
}: {
  element: NavElementType;
  classNames?: string;
}) {
  return (
    <NavigationMenuItem className={cn(classNames)}>
      <Link href={element.href} legacyBehavior passHref>
        <Button variant={"link"}>{element.title}</Button>
      </Link>
    </NavigationMenuItem>
  );
}

export default NavItems;
