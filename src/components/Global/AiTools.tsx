import React from "react";
import { TabsContent } from "../ui/tabs";

type AiToolsProps = {
  plan: "PRO" | "FREE";
  trail: boolean;
  videoId: string;
};

const AiTools = ({ plan, trail, videoId }: AiToolsProps) => {
  return (
    <TabsContent
      value="AiTools"
      className=" p-5 bg-black  rounded-xl flex flex-col gap-y-10"
    ></TabsContent>
  );
};

export default AiTools;
