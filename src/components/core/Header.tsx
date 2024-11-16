"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { Monitor } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Monitor />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li onClick={() => setTheme("system")}>
                <Button>System</Button>
              </li>
            </ul>
            <ul>
              <li onClick={() => setTheme("dark")}>
                <Button>Dark</Button>
              </li>
            </ul>
            <ul>
              <li onClick={() => setTheme("light")}>
                <Button>Light</Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>Sign in</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
