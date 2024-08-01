"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect } from "react";
import { Categories, newCategories as categories } from "../Categories";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export function ComboBoxResponsive({
  setCategory,
  category,
  onChange,
  ...props
}: {
  setCategory?: string;
  category?: string;
  value: any;
  onChange: (value:string) => void,
  setValue: (status: Categories | null) => void;
}) {
  const { value, setValue } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverTrigger  asChild>
          <Button variant={"category"} className=" w-full justify-start">
            {value ? <>{value}</> : <>+ Choose a category</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CategoryList onChange={onChange} setOpen={setOpen} setSelectedCategory={setValue} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer modal={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value ? <>{value.label}</> : <>+ Choose a category</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CategoryList onChange={onChange} setOpen={setOpen} setSelectedCategory={setValue} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CategoryList({
  setOpen,
  setSelectedCategory,
  onChange,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCategory: (status: Categories | null) => void;
  onChange: (value:string) => void
}) {
  return (
    <Command>
      <CommandInput disabled={false} placeholder="Filter categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              disabled={false}
              key={category.name}
              value={category.name}
             
              onSelect={(value) => {
                onChange(value)
                setSelectedCategory(
                  categories.find((category) => category.name == value) || null
                );
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                {category.name}
                {category.icon}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
