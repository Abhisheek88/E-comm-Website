import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice, ITEMs_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";

      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMs_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort,editableOrderId]);

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max  w-full table-auto ">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order# {" "}
                      {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                     Total Amount {" "}
                      {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div  key={item.product.id} className=" py-1 flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-8 h-8  rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} Qty-{item.quantity} - $
                              {discountedPrice(item.product)} Each
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className=" ">
                          <div>
                            {" "}
                            <strong>{order.selectedAddress.name}</strong>
                          </div>
                          <div>
                            {order.selectedAddress.street},{" "}
                            {order.selectedAddress.city},
                          </div>

                          <div>
                            {order.selectedAddress.state},{" "}
                            {order.selectedAddress.pinCode},
                          </div>

                          <div>{order.selectedAddress.phone}</div>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="selectStatus">selectStatus</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                          </select>
                        ) : (
                          <span
                            className={` ${chooseColor(
                              order.status
                            )} cursor-pointer py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="cursor-pointer w-5 mr-4 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-6 h-6"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="cursor-pointer w-5 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalOrders}
          ></Pagination>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
