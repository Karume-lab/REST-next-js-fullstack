"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const sortByOptions = [
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Created Date",
    value: "createdAt",
  },
  {
    label: "Created By",
    value: "createdBy",
  },
  {
    label: "Category",
    value: "category",
  },
];

const SortBy = () => {
  const [sortBy, setSortBy] = useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          <p className="text-sm">Sort By</p>
          <Button variant="outline" size={"sm"} className="space-x-2">
            <span>
              {sortByOptions.find((option) => option.value === sortBy)?.label}
            </span>
            <ChevronDown />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {sortByOptions.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
