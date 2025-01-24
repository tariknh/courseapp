"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/Filter/scroll-area"
import { cn } from "@/lib/utils"
import { MenuIcon as Restaurant, Hotel, Landmark, ShoppingBag } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { categories } from "@/components/Categories"
import { APIProvider } from "@vis.gl/react-google-maps"
import { PlaceAutocomplete } from "@/components/Inputs/PlacesAutoComplete"

// Define the categories with icons
// const categories = [
//   { id: "restaurants", label: "Restaurants", icon: Restaurant },
//   { id: "hotels", label: "Hotels", icon: Hotel },
//   { id: "attractions", label: "Attractions", icon: Landmark },
//   { id: "shopping", label: "Shopping", icon: ShoppingBag },
// ]

export default function FilterModal() {
  const [open, setOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string>()
  const [citySearch, setCitySearch] = useState("")

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentCategory = searchParams.get("category")?.toString();
  const currentCity = searchParams.get("city")?.toString();
  //setSelectedCategories(currentCategory);

  const handleCategoryChange = (category: string, e: React.FormEvent) => {
    e.preventDefault()
    setSelectedCategories(category)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Selected categories:", selectedCategories)
    console.log("City search:", citySearch)
    const params = new URLSearchParams(searchParams);
    const getCategoryLabel = categories.find((category)=> category.name == selectedCategories)
    if (getCategoryLabel) {
      params.set("category", getCategoryLabel?.name );
    } else {
      params.delete("category");
    }
    if (selectedCategories) {
      params.set("city", citySearch);
    } else {
      params.delete("city");
    }
    replace(`${pathname}?${params.toString()}`);
    // Here you would typically update your main component's state or call an API
    setOpen(false)
  }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mx-2" asChild>
        <Button variant="outline">Filters: {currentCategory && currentCity
            ? currentCategory + " - " + currentCity
            : "Any Category - Any City"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="city" className="text-left">
              Search Location
            </Label>
            {/* <Input
              id="city"
              placeholder="Enter city name"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
            /> */}
            <APIProvider apiKey={`${process.env.NEXT_PUBLIC_MAPS}`}>
                    <PlaceAutocomplete
                      className="text-offblack z-20"
                      value={citySearch}
                      onPlaceSelect={(e) =>{
                        
                        e?.formatted_address &&
                        setCitySearch(e.formatted_address)
                      }
                      }
                    />
                  </APIProvider>
          </div>
          <div className="grid gap-2">
            <Label className="text-left">Categories</Label>
            <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-scroll">
            {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className={cn(
                      "flex h-20 aspect-video bg-zinc-300   flex-col items-center justify-center space-y-2  hover:border-[1px] border-black hover:text-accent-foreground",
                      selectedCategories?.includes(category.name) &&
                        "bg-accent text-white"
                    )}
                    onClick={(e) => handleCategoryChange(category.name,e)}
                  >
                    {category.icon}
                    <span className="text-xs text-wrap">{category.name}</span>
                  </Button>
                ))}
            </div>
          </div>
          <Button type="submit">Apply Filters</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

