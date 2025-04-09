import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";




export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex,setSelectedEditIndex] =useState(-1);
  const [showAddressForm,setShowAddressForm] =useState(false);
  
const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleEditForm = (index)=>{
    setSelectedEditIndex(index);
    const address =userInfo.addresses[index];
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('street', address.street)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('pinCode', address.pinCode)

  }


  const handleEdit = (addressUpdate,index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; //for shallow copy
    newUser.addresses.splice(index, 1,addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; //for shallow copy
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAdd =(address)=>{
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddressForm(false)
  }

  return (
    <div>
      <div className="mt-16 bg-stone-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8    rounded-md ">
        <h1 className="text-5xl font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
          Name: {userInfo.name ? userInfo.name : "New Guest"}
        </h1>
        <h3 className="text-lg font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
          Email address: {userInfo.email}
        </h3>
        {userInfo.role==='admin' && (<h3 className="text-lg font-serif font-semibold tracking-tighter text-slate-800 pl-10 py-5">
          role: {userInfo.role}
        </h3>)}
        </div>
     

      {/* Subtotal and checkout button */}

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <button
           onClick={ e=> {setShowAddressForm(true); setSelectedEditIndex(-1)}}
                      type="submit"
                      className="rounded-md bg-green-600 px-3 py-2 my-5  text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add address
                    </button> 

                    { showAddressForm  ? <form
              noValidate 
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
              className="bg-stone-200 px-5 py-12 mt-12  rounded-md"
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
                        {errors.street && (
                  <p className="text-red-500"> {errors.street.message}</p>
                )}
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

                  <div className="mt-9 py-6 flex items-center justify-end gap-x-6">
                  
                    
                    <button
                     
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add New Address
                    </button>
                  </div>
                </div>

                


              </div>
            </form>:null}
         
        <p className="mt-0.5 text-md  text-gray-600">Your Address:</p>
        {userInfo.addresses.map((address, index) => (
          <div key={index}>
           { selectedEditIndex === index ? <form
              noValidate
              const
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleEdit(data,index);
                reset();
              })}
              className="bg-stone-200 px-5 py-12 mt-12  rounded-md"
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
                        {errors.street && (
                  <p className="text-red-500"> {errors.street.message}</p>
                )}
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

                  <div className="mt-9 py-6 flex items-center justify-end gap-x-6">
                  
                    <button
                      type="submit"
                      onClick={e=> setSelectedEditIndex(-1)}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cancle
                    </button>

                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit address
                    </button>
                  </div>
                </div>

                


              </div>
            </form>:null}

            <div className="flex justify-between gap-x-6 p-5 border border-red-300 rounded-md ">
              <div className="flex min-w-0 gap-x-4  items-center">
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
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <button
                  onClick={(e) => handleEditForm(index)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleRemove(e, index)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

    </div>
    </div>
  );
}
