import ImageLogo from "@/Component/ImageLogo";
import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingPageNavbar = () => {
  return (
    <div className=" flex w-full justify-between items-center">
      <div className=" text-3xl font-semibold flex items-center gap-x-2">
        <MenuIcon
          className=" w-6 
         h-6"
        ></MenuIcon>
        <ImageLogo></ImageLogo>
      </div>
      <div className=" hidden gap-x-10 items-center lg:flex">
        <Link
          href={"/"}
          className=" bg-link py-2 px-5 font-semibold text-lg rounded-full hover:bg-link/80 "
        >
          Home
        </Link>
        <Link href={"/"}>Pricing</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/auth/sign-in"}>
          <Button className=" text-base flex gap-x-2">
            <User fill={"#000"}></User>Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
