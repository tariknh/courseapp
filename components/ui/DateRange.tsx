"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Matcher } from "react-day-picker";

interface InputProps {
  value?: any;
  onChange: (value: any) => void;
  className?: any;
  id?: string;
  disabled?: Matcher | Matcher[] | undefined;
}

export const DatePickerWithRange: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  id,
  disabled,
}: InputProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2 z-[5000]", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto z-[50000] pointer-events-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            disabled={disabled}
            numberOfMonths={2}
            className="z-[50000]"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(value) => onChange(value)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
