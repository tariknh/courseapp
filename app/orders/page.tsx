import { TableDemo } from "@/components/Table";
import {
  getCourseById,
  getOrdersByCourseId,
} from "@/lib/actions/course.actions";

type Props = {};

const OrdersPage = async (params: any) => {
  const { searchParams } = params;
  //console.log(searchParams.eventId, "searchParams");
  const orders = await getOrdersByCourseId(searchParams.eventId);
  const course = await getCourseById(searchParams.eventId);

  //console.log(orders, "orders");
  return (
    <div className="pt-[10vh]">
      <div className="p-4 font-bold bg-accent text-white text-xl">
        <h2>
          Orders for <span className="text-offblack">{course.data.title}</span>
        </h2>
      </div>
      <TableDemo orders={orders} />
    </div>
  );
};

export default OrdersPage;
