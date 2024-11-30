"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 text-red-950 dark:text-rose-50 hover:bg-red-100/20 dark:hover:bg-red-950/20"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-2">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 py-2 cursor-pointer hover:bg-red-100/20 dark:hover:bg-red-950/20"
        >
          <Sun className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 py-2 cursor-pointer hover:bg-red-100/20 dark:hover:bg-red-950/20"
        >
          <Moon className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 py-2 cursor-pointer hover:bg-red-100/20 dark:hover:bg-red-950/20"
        >
          <Monitor className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 