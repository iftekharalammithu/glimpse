"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      redirect("/");
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className=" flex items-center justify-center h-screen w-full">
      Not Found
    </div>
  );
};

export default NotFound;
