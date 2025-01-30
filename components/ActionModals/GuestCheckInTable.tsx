"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Undo2 } from "lucide-react";
import { useState } from "react";

interface Guest {
  name: string;
  email: string;
  status: "Confirmed" | "Awaiting Confirmation";
  registrationDate: string;
  checkedIn: boolean;
}

const initialGuests: Guest[] = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Confirmed",
    registrationDate: "2023-05-15",
    checkedIn: false,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    status: "Awaiting Confirmation",
    registrationDate: "2023-05-17",
    checkedIn: false,
  },
  {
    name: "Carol Williams",
    email: "carol@example.com",
    status: "Confirmed",
    registrationDate: "2023-05-14",
    checkedIn: true,
  },
  {
    name: "David Brown",
    email: "david@example.com",
    status: "Awaiting Confirmation",
    registrationDate: "2023-05-18",
    checkedIn: false,
  },
  {
    name: "Eve Davis",
    email: "eve@example.com",
    status: "Confirmed",
    registrationDate: "2023-05-16",
    checkedIn: true,
  },
];

export function GuestCheckInTable() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [guestList, setGuestList] = useState<Guest[]>(initialGuests);

  const handleGuestClick = (guest: Guest) => {
    setSelectedGuest(guest);
  };

  const handleCloseModal = () => {
    setSelectedGuest(null);
  };

  const updateGuestList = (updatedGuest: Guest) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.email === updatedGuest.email ? updatedGuest : guest
    );
    setGuestList(updatedGuestList);
    setSelectedGuest(updatedGuest);
  };

  const handleCheckIn = () => {
    if (selectedGuest) {
      const updatedGuest: Guest = {
        ...selectedGuest,
        checkedIn: true,
        status: "Confirmed",
      };
      updateGuestList(updatedGuest);
    }
  };

  const handleUndo = () => {
    if (selectedGuest) {
      const updatedGuest: Guest = {
        ...selectedGuest,
        checkedIn: false,
        status:
          selectedGuest.status === "Confirmed"
            ? "Confirmed"
            : "Awaiting Confirmation",
      };
      updateGuestList(updatedGuest);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Guest</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guestList.map((guest) => (
            <TableRow
              key={guest.email}
              onClick={() => handleGuestClick(guest)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>
                <div>{guest.name}</div>
                <div className="text-sm text-muted-foreground">
                  {guest.email}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {guest.status === "Confirmed" ? (
                  <span className="text-green-600 font-medium">Confirmed</span>
                ) : (
                  <span className="text-yellow-600 font-medium">
                    Awaiting Confirmation
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Guests</TableCell>
            <TableCell className="text-right">{guestList.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Dialog open={selectedGuest !== null} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedGuest?.name}</DialogTitle>
            <DialogDescription>{selectedGuest?.email}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              <strong>Status:</strong> {selectedGuest?.status}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {selectedGuest?.registrationDate}
            </p>
            <p>
              <strong>Checked In:</strong>{" "}
              {selectedGuest?.checkedIn ? "Yes" : "No"}
            </p>
          </div>
          <DialogFooter>
            {selectedGuest &&
              (!selectedGuest.checkedIn ? (
                <Button onClick={handleCheckIn}>Check In</Button>
              ) : (
                <Button onClick={handleUndo} variant="outline">
                  <Undo2 className="mr-2 h-4 w-4" />
                  Undo Check-In
                </Button>
              ))}
            <Button variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
