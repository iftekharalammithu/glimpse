"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

export default function Home() {
  const theme = useTheme();

  return (
    <div className=" flex h-screen gap-2 items-center justify-center ">
      <Button className=" px-10 py-2" onClick={() => redirect("/dashboard")}>
        Go To Dashboard
      </Button>
    </div>
  );
}
