import { onAuthenticateUser } from "@/Actions/User";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);
  }
  if (auth.status == 400 || auth.status === 500) {
    return redirect("/auth/sign-in");
  }
  return <div></div>;
};

export default page;
