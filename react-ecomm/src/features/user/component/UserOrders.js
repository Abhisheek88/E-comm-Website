import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/constants";


export default function UserOrders() {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  console.log("Orders Data:", orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div>
          <div>
            <div className="mt-20 bg-stone-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8    rounded-md overflow-hidden">
              <h1 className="text-5xl font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
                Order #{order.id}
              </h1>
              <h3 className="text-lg font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
                Order Status :- {order.status}
              </h3>

              <div className="px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={item.title}
                            src={item.thumbnail}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.title}</h3>
                              <div>
                                {" "}
                                <p className="ml-4 font-bold">
                                  ${" "}
                                  {discountedPrice(item)* item.quantity}
                                </p>
                                <p className="ml-4 text-gray-400 line-through">
                                  $ {item.price.toFixed(2) * item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-600">
                              <label
                                htmlFor="quantity"
                                className="inline text-sm font-medium leading-6 text-gray-900 mr-3"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Subtotal and checkout button */}

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p className="font-bold">$ {order.totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items in Cart</p>
                  <p className="text-gray-500">{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-md pb-2 text-gray-600">
                  Shipping Address
                </p>

                <div className="flex justify-between gap-x-6 p-5 border border-red-300 rounded-md ">
                  <div className="flex min-w-0 gap-x-4  items-center">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {order.selectedAddress.name}{" "}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {order.selectedAddress.email}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {order.selectedAddress.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.street}{" "}
                      <span>, {order.selectedAddress.city}</span>
                    </p>

                    <p className="mt-1 text-xs/5 text-gray-500">
                      {order.selectedAddress.state}{" "}
                      <span>, {order.selectedAddress.pinCode}</span>{" "}
                    </p>
                    {/* <p className="mt-1 text-xs/5 text-gray-500">
                          {address.pinCode}
                        </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
