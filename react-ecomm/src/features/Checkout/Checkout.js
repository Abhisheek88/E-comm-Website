import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../cart/CartSlice";
import {  updateUserAsync } from "../auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectUserInfo } from "../user/userSlice";
import { discountedPrice } from "../../app/constants";







export default function Checkout() {
  const dispatch = useDispatch();
  
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);

  
 
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const totalAmount = items.reduce(
    (amount, item) =>
      discountedPrice(item) *
        item.quantity +
      amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress =(e)=>{
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }
  const handlePayment =(e)=>{
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }
   
  const handleOrder =(e)=>{
    const order ={items,totalAmount,totalItems,user,paymentMethod,selectedAddress,status:'pending'}
    dispatch(createOrderAsync(order))
  }
   
 

  

  return (
  <> 
   
   {!items.length && <Navigate to='/' replace={true} ></Navigate>}

   {currentOrder && currentOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${currentOrder.id }`} replace={true} ></Navigate>}
      
    <div className=" mt-9 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  rounded-md ">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
        <div className="lg:col-span-3">
         <form
                      noValidate
                      const
                      onSubmit={handleSubmit((data) => {
                        console.log(data);
                        dispatch(
                          updateUserAsync({
                            ...user,
                            addresses: [...user.addresses, data],
                          })
                        );
                        reset();
                      })}
                      className="bg-stone-200 p-4  rounded-md"
                    >
                      <div className="space-y-12 ">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base/7 font-semibold text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm/6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>
        
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="Name"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="name"
                                  {...register("name", {
                                    required: "name is required",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                 {errors.name && (
                          <p className="text-red-500"> {errors.name.message}</p>
                        )}
                              </div>
                            </div>
        
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required",
                                  })}
                                  type="email"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                 {errors.email && (
                          <p className="text-red-500"> {errors.email.message}</p>
                        )}
                              </div>
                            </div>
        
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Phone number
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "phone is required",
                                  })}
                                  type="tel"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.phone && (
                          <p className="text-red-500"> {errors.phone.message}</p>
                        )}
                              </div>
                            </div>
        
                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="street"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
        
                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  id="city"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.city && (
                          <p className="text-red-500"> {errors.city.message}</p>
                        )}
                              </div>
                            </div>
        
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  id="state"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                 {errors.state && (
                          <p className="text-red-500"> {errors.state.message}</p>
                        )}
                              </div>
                            </div>
        
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  id="pinCode"
                                  {...register("pinCode", {
                                    required: "pinCode is required",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                 {errors.pinCode && (
                          <p className="text-red-500"> {errors.pinCode.message}</p>
                        )}
                              </div>
                            </div>
                          </div>
        
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              className="text-sm/6 font-semibold text-gray-900"
                            >
                              reset
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add address
                            </button>
                          </div>
                        </div>
                        </div>
                         </form>
        
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base/7 font-semibold text-gray-900">
                            Saved Address
                          </h2>
                          <p className="mt-1 text-sm/6 text-gray-600">
                            Choose from Existing Address
                          </p>
        
                          <ul role="list" className=" ">
                            {user.addresses.map((address, index) => (
                              <li
                                key={index}
                                className="flex justify-between gap-x-6 p-5 border rounded-md"
                              >
                                <div className="flex min-w-0 gap-x-4  items-center">
                                  <input
                                    name="address"
                                    onChange={handleAddress}
                                    value={index}
                                    // onChange={() => setSelectedAddress(address.email)}
                                    type="radio"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                  />
                                  <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                      {address.name}{" "}
                                    </p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                                      {address.email}
                                    </p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                                      {address.phone}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                  <p className="text-sm/6 text-gray-900">
                                    {address.street} <span>, {address.city}</span>
                                  </p>
        
                                  <p className="mt-1 text-xs/5 text-gray-500">
                                    {address.state} <span>, {address.pinCode}</span>{" "}
                                  </p>
                                  {/* <p className="mt-1 text-xs/5 text-gray-500">
                                                       {address.pinCode}
                                                     </p> */}
                                </div>
                              </li>
                            ))}
                          </ul>
        
                          {/* Payment method  */}
        
                          <div className="mt-10 space-y-10">
                            <fieldset>
                              <legend className="text-sm/6 font-semibold text-gray-900">
                                Payment Method
                              </legend>
                              <p className="mt-1 text-sm/6 text-gray-600">Choose one</p>
                              <div className="mt-6 space-y-2">
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="cash"
                                    name="payments"
                                    value="cash"
                                    onChange={handlePayment}
                                    checked={paymentMethod === "cash"}
                                    type="radio"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                  />
                                  <label
                                    htmlFor="cash"
                                    className="block text-sm/6 font-medium text-gray-900"
                                  >
                                    Cash on Delivery
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="card"
                                    onChange={handlePayment}
                                    checked={paymentMethod === "card"}
                                    name="payments"
                                    type="radio"
                                    value="card"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                  />
                                  <label
                                    htmlFor="card"
                                    className="block text-sm/6 font-medium text-gray-900"
                                  >
                                    Card payment
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                      
        
        
                      </div>
                   
        </div>

        <div className="lg:col-span-2">
          <div className="mt-20 bg-stone-200 mx-auto max-w-7xl px-2 sm:px-2 lg:px-4    rounded-md overflow-hidden">
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
                              
                              <p className="ml-4 font-bold">
                                $
                                {(discountedPrice(item) * item.quantity)}
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
              {/* <Link to={currentOrder ? `/order-success/${currentOrder.id}` : "#"} > */}
                <div className="mt-6">
                  <div
                  onClick = {handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
               {/* </Link> */}
              
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
      </div>
    </div>
    </>
  );
}
