import { onAuthenticateUser } from "@/Actions/User";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201) {
    console.log(auth);
    // return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);
    return redirect(`/dashboard/${auth.user?.id}`);
  }
  if (auth.status == 400 || auth.status === 500) {
    return redirect("/auth/sign-in");
  }
  return <div></div>;
};

export default page;
