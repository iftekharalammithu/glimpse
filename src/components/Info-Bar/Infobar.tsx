import { Search, Upload, VideotapeIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

const Infobar = () => {
  return (
    <header className="pl-20  md:pl-[250px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search className=" text-text2" size={25}></Search>
        <Input
          className=" bg-transparent border-none !placeholder-nutral-500"
          placeholder="Search for people , projects tags & folders"
        ></Input>
      </div>
      <div className=" flex gap-2 items-center">
        <Button className=" bg-text2 flex items-center gap-2">
          <Upload size={30}></Upload>
          <span className=" flex items-center gap-2">Upload</span>
        </Button>
        <Button className=" bg-text2 flex items-center gap-2">
          <VideotapeIcon></VideotapeIcon>
          <span className=" flex items-center gap-2">Recode</span>
        </Button>
        <UserButton></UserButton>
      </div>
    </header>
  );
};

export default Infobar;
