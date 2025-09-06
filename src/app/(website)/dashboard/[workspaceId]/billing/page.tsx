import { getPaymentInfo } from "@/Actions/User";
import React from "react";

const page = async () => {
  const payment = await getPaymentInfo();
  return (
    <div className=" bg-gray-800 flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className=" text-2xl">Current Plan</h2>
        <p className=" text-gray-400">Your Payment History</p>
      </div>
      <div>
        <h2 className=" text-2xl">
          ${payment.data?.subscription?.plan === "PRO" ? "99" : "0"}/Month
        </h2>
        <p className=" text-gray-400">{payment.data?.subscription?.plan}</p>
      </div>
    </div>
  );
};

export default page;
