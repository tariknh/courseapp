"use client"

import { useActionState, useState } from "react"
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
import { updateListing } from "@/lib/actions/course.actions"
import { Textarea } from "./ui/textarea"

// Define the categories with icons
const categories = [
  { id: "restaurants", label: "Restaurants", icon: Restaurant },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "attractions", label: "Attractions", icon: Landmark },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
]

export default function EditListing({listingData: {title, description, category, date, location, capacity, price,id, ...listing}}:any) {
  const [open, setOpen] = useState(false)
  //const [title, setTitle] = useState<string | number | readonly string[] | undefined>()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Selected categories:", selectedCategories)
    // console.log("City search:", citySearch)

    // Here you would typically update your main component's state or call an API
    setOpen(false)
  }
  const initialState = {
    message: 'Example',
    title: "None",
  }

  const [listingInfo, setListingInfo] = useState({
    title: title,
    description: description,
    category: category,
    date: date,
    location: location,
    capacity: capacity,
    price: price,
    id: id
  });

  const [state, formAction, pending] = useActionState(updateListing, undefined)
console.log(listingInfo.id, "listingID")
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mx-2" asChild>
        <Button variant="outline">Edit Listing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-left">
              Course Title
            </Label>
            <Input
              id="title"
                name="title"
              placeholder="Edit title"
              value={listingInfo.title}
              onChange={(e)=>(
                setListingInfo((info) => ({ ...info, title: e.target.value }))
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-left">Description</Label>
            <Textarea
              id="description"
              placeholder="Edit description"
              value={listingInfo.description}
              onChange={(e)=>(
                setListingInfo((info) => ({ ...info, description: e.target.value }))
              )}
            />
          </div>
          <Button type="submit">Update Listing</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

