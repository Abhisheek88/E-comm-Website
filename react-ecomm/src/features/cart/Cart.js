import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectItems,
  updateCartAsync,
} from "./CartSlice";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";


export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const items = useSelector(selectItems);
  const cartLoaded =useSelector(selectCartLoaded);
  
  const totalAmount = items.reduce(
    (amount, item) =>
      discountedPrice(item.product) *
        item.quantity +
      amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

    

  return (
    <>
     {!items.length  && cartLoaded && <Navigate to='/' replace={true} ></Navigate>}
     
      <div>
        <div className="mt-20 bg-stone-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8    rounded-md overflow-hidden">
          <h1 className="text-5xl font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
            {" "}
            Cart
          </h1>

          <div className="px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={item.product.title}
                        src={item.product.thumbnail}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.product.title}</h3>
                          <div>
                            {" "}
                            <p className="ml-4 font-bold">
                              ${" "}
                              {discountedPrice(item.product) * item.quantity}
                            </p>
                            <p className="ml-4 text-gray-400 line-through">
                              $ {item.product.price.toFixed(2) * item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-600">
                          <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-900 mr-3"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                            name=""
                            id=""
                            className="bg-slate-50 border-2 border-blue-100 focus:ring-2 focus:ring-blue-200  rounded-md p-1"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={(e) => handleRemove(e, item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
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
              <p className="font-bold">$ {totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total items in Cart</p>
              <p className="text-gray-500">{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-600">
              Shipping and taxes calculated at checkout.
            </p>
            <Link to="/checkout">
              <div className="mt-6">
                <p
                  // href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </p>
              </div>
            </Link>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
              <p>
                or{" "}
                <Link to="/home">
                  <button
                    type="button"
                    // onClick={() => setOpen(false)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
