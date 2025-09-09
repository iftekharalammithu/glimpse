import { acceptInvite } from "@/Actions/User";
import { redirect } from "next/navigation";
import React from "react";

const page = async (props: { params: { inviteId: string } }) => {
  const { inviteId } = await props.params;
  const invitation = await acceptInvite(inviteId);
  if (invitation.status === 404) {
    return redirect("/auth/sign-in");
  }
  if (invitation.status === 401) {
    return (
      <div className=" h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className=" text-6xl font-bold text-white">Not Authorize</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }
  if (invitation.status === 200) {
    return redirect("/auth/callback");
  }
  return <div></div>;
};

export default page;
