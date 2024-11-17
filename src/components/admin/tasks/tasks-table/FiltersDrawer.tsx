"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import FiltersForm from "./FiltersForm";
import LoadingButton from "@/components/core/LoadingButton";
import { useState } from "react";

const FiltersDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Sheet open={isDrawerOpen} onOpenChange={(state) => setIsDrawerOpen(state)}>
      <SheetTrigger asChild>
        <Button>
          <span>Filters</span>
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>You can apply filters from here.</SheetDescription>
        </SheetHeader>
        <FiltersForm />
        <SheetFooter>
          <SheetClose asChild>
            <LoadingButton
              type="submit"
              disabled
              form="filter-form"
              text="Apply Filters"
              loadingText="Applying filters"
              onClick={() => setIsDrawerOpen(false)}
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersDrawer;
