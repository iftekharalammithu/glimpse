import { completeSubscription } from "@/Actions/User";
import { redirect } from "next/navigation";
import React from "react";

const page = async (props: {
  searchParams: { session_id?: string; cancel?: boolean };
}) => {
  const { session_id, cancel } = props.searchParams;
  if (session_id) {
    const customer = await completeSubscription(session_id);
    if (customer.status === 200) {
      return redirect("/auth/callback");
    }
  }

  if (cancel) {
    return (
      <div className=" flex flex-col justify-center items-center h-screen w-full">
        <h4 className=" text-5xl font-bold">404</h4>
        <p className=" text-lg text-center ">Oops something went wrong</p>
      </div>
    );
  }
};

export default page;
