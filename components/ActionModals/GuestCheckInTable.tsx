"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getNameById,
  getOrdersByCourseId,
  undoCheckin,
} from "@/lib/actions/course.actions";
import { Skeleton } from "antd";
import { formatDate } from "date-fns/format";
import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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

type TicketTypes = {
  buyer: string; // UUID format
  createdAt: string; // Date in "YYYY-MM-DD" format
  created_at: string; // ISO timestamp
  has_checked_in: boolean;
  id: number;
  listingId: {
    id: number;
    date: string | Record<string, any>; // Adjust if date is an object
    user: string; // UUID
    image: string | null;
    price: number;
    [key: string]: any; // Allow additional properties
  };
  stripeId: string;
  totalAmount: string; // Consider changing to `number` if always numeric
};

export function GuestCheckInTable({ id }: { id: string }) {
  const [tickets, setTickets] = useState<TicketTypes[]>();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        setIsLoading(true);
        const { ticketData } = await getOrdersByCourseId(id);
        setTickets(ticketData);
      } catch (error) {
        console.log(error, "ERROR GETTING TICKETS");
      } finally {
        setIsLoading(false);
      }
    };
    getTickets();
  }, [id]);

  console.log(tickets, "ticket!");
  const [selectedGuest, setSelectedGuest] = useState<TicketTypes | null>(null);
  //const [guestList, setGuestList] = useState<TicketTypes[]>(tickets);

  // const updateGuestList = (guest: TicketTypes) => {
  //   const updatedGuestList = tickets?.map((ticket) =>
  //     ticket.id === guest.id ? guest : ticket
  //   );
  //   setGuestList(updatedGuestList);
  //   setSelectedGuest(updatedGuest);
  // };

  // const handleCheckIn = () => {
  //   if (selectedGuest) {
  //     const updatedGuest: Guest = {
  //       ...selectedGuest,
  //       checkedIn: true,
  //       status: "Confirmed",
  //     };
  //     updateGuestList(updatedGuest);
  //   }
  // };

  // const handleUndo = () => {
  //   if (selectedGuest) {
  //     const updatedGuest: Guest = {
  //       ...selectedGuest,
  //       checkedIn: false,
  //       status:
  //         selectedGuest.status === "Confirmed"
  //           ? "Confirmed"
  //           : "Awaiting Confirmation",
  //     };
  //     updateGuestList(updatedGuest);
  //   }
  // };
  if (loading) return <Skeleton />;

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
          {tickets?.map((ticket) => (
            <TableRow
              key={ticket.id}
              onClick={() => setSelectedGuest(ticket)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TicketBuyer
                courseId={id}
                selected={selectedGuest}
                ticket={ticket}
              />
            </TableRow>
          ))}
          {/* {guestList.map((guest) => (
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
          ))} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Guests</TableCell>
            <TableCell className="text-right">{tickets?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
type TicketItemProps = {
  ticket: TicketTypes;
  selected: any;
  courseId: string;
};
type BuyerData = {
  name: string;
  email: string;
  id: string; // or number, depending on your data
};

const TicketBuyer = ({ ticket, selected, courseId }: TicketItemProps) => {
  const [buyerData, setBuyerData] = useState<BuyerData>();
  const [isSelected, setIsSelected] = useState<TicketTypes>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGuestClick = (selected: TicketTypes) => {
    if (ticket == selected) {
      console.log(ticket, selected, "THIS IS THE ONE SELECTED");
      setIsSelected(ticket);
    }
  };

  const handleCloseModal = () => {
    setIsSelected(undefined);
  };

  console.log(selected, "selected");

  useEffect(() => {
    const fetchBuyerName = async () => {
      try {
        const buyer = await getNameById(ticket.buyer);
        setBuyerData({
          name: buyer?.name || "Anonymous",
          email: buyer?.email || "Anonymous@anon.com",
          id: buyer?.id || "Anonymous ID",
        });
      } catch (error) {
        console.error("Error fetching buyer name:", error);
      }
    };

    fetchBuyerName();
  }, [ticket.buyer]);

  const handleUndoCheckIn = async () => {
    const result = await undoCheckin(
      selected,
      courseId,
      selected?.has_checked_in
    );
    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Successfully updated check-in status");
    }
  };

  const registrationDate = selected?.created_at
    ? formatDate(new Date(selected.created_at), "yyyy-MM-dd HH:mm:ss")
    : "";
  return (
    <>
      <TableCell onClick={() => handleGuestClick(selected)}>
        {isLoading ? <Skeleton /> : <div>{buyerData?.name}</div>}
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="text-sm text-muted-foreground">
            {buyerData?.email}
          </div>
        )}
      </TableCell>
      <TableCell className="text-right">
        {ticket.has_checked_in === true ? (
          <span className="text-green-600 font-medium">Confirmed</span>
        ) : (
          <span className="text-yellow-600 font-medium">
            Awaiting Confirmation
          </span>
        )}
      </TableCell>
      <Dialog open={isSelected == ticket} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{buyerData?.name}</DialogTitle>
            <DialogDescription>{buyerData?.email}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              <strong>Status:</strong>{" "}
              {ticket.has_checked_in ? "Checked in" : "Not Checked in"}
            </p>
            <p>
              <strong>Registration Date:</strong> {registrationDate}
            </p>
            <p>
              <strong>Checked In:</strong>{" "}
              {selected?.has_checked_in ? "Yes" : "No"}
            </p>
          </div>
          <DialogFooter>
            {selected &&
              (!selected.has_checked_in ? (
                <Button onClick={handleUndoCheckIn}>Check In</Button>
              ) : (
                <Button onClick={handleUndoCheckIn} variant="outline">
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
};
