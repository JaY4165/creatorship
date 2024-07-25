import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { NavElementType } from "./Navbar";

function NavItems({
  element,
  classNames,
}: {
  element: NavElementType;
  classNames?: string;
}) {
  return (
    <NavigationMenuItem className={classNames}>
      <Link href={element.href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {element.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

export default NavItems;
