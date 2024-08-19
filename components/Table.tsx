import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface OrderDetails {
  id: string;
  stripeId: string;
  created_at: string;
  buyer: string;
  totalAmount: string;
}

interface OrderProps {
  data: OrderDetails[];
}

export function TableDemo({ orders }: { orders: OrderProps }) {
  //console.log(orders, "orders from table");
  const { data } = orders;
  console.log(data, "data from table");
  return (
    <Table>
      <TableCaption>A list of orders for your course</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">OrderID</TableHead>
          <TableHead>Date Purchased</TableHead>
          <TableHead>Buyer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => (
          <TableRow className="" key={order.id}>
            {/* <TableCell className="font-medium max-w-24 md:max-w-60 overflow-ellipsis overflow-hidden">
              {order.stripeId}
            </TableCell> */}
            <TableCell className="max-h-fit max-w-[150px] truncate group-hover:text-clip  hover:max-w-none hover:bg-white hover:z-20">
              {order.stripeId}
            </TableCell>

            <TableCell>
              {new Date(order.created_at).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>

            <TableCell>{order.buyer}</TableCell>
            <TableCell className="text-right">{order.totalAmount} kr</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
