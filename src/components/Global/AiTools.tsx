import React from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Bot, Loader2, Pencil, StarIcon } from "lucide-react";
import ImageLogo from "@/Component/ImageLogo";

type AiToolsProps = {
  plan: "PRO" | "FREE";
  trail: boolean;
  videoId: string;
};

const AiTools = ({ plan, trail, videoId }: AiToolsProps) => {
  return (
    <TabsContent
      value="AI Tools"
      className=" p-5 bg-black  rounded-xl flex flex-col gap-y-10"
    >
      <div className=" flex  flex-col  items-center">
        <div className=" text-start w-full ">
          <h2 className=" text-3xl font-bold ">AI Tools</h2>
          <p className=" text-gray-400">
            Taking your Video to the next <br /> Step with the AI
          </p>
        </div>

        <div className=" flex gap-2 items-center justify-center">
          <Button className=" mt-2 text-sm">
            {/* pending */}
            {false ? <Loader2 className=" animate-spin"></Loader2> : "Try Now"}
          </Button>
          <Button variant={"secondary"} className="  mt-2 text-sm">
            {/* pending */}
            {false ? <Loader2 className=" animate-spin"></Loader2> : "Pay Now"}
          </Button>
          <Button className=" mt-2 text-sm">
            {/* pending */}
            {false ? (
              <Loader2 className=" animate-spin"></Loader2>
            ) : (
              "Generate Now"
            )}
          </Button>
        </div>
      </div>
      {/* {plan === "FREE" ? (
          !trail ? (
          ) : (
            ""
          )
        ) : (
          ""
        )} */}
      <div className=" border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-black">
        <div className=" flex items-center gap-2">
          <h2 className=" text-2xl flex gap-1 items-center font-bold text-pink-500">
            <ImageLogo></ImageLogo>
            <StarIcon color="#a22fe0" fill="#a22fe0"></StarIcon>
          </h2>
        </div>
        <div className=" flex gap-2 items-start">
          <div className=" p-2 rounded-full border-black border-[2px] bg-gray-800">
            <Pencil color="#a22fe0"></Pencil>
          </div>
          <div className=" flex flex-col">
            <h3 className=" font-medium">Summary</h3>
            <p className=" text-muted-foreground text-sm">
              Generate a description for your video using AI
            </p>
          </div>
        </div>
        <div className=" flex gap-2 items-start">
          <div className=" p-2 rounded-full border-black border-[2px] bg-gray-800">
            <Pencil color="#a22fe0"></Pencil>
          </div>
          <div className=" flex flex-col">
            <h3 className=" font-medium">Summary</h3>
            <p className=" text-muted-foreground text-sm">
              Generate a description for your video using AI
            </p>
          </div>
        </div>
        <div className=" flex gap-2 items-start">
          <div className=" p-2 rounded-full border-gray-700 border-[2px] bg-gray-800">
            <Bot color="#a22fe0"></Bot>
          </div>
          <div className=" flex flex-col">
            <h3 className=" font-medium">AI Agent</h3>
            <p className=" text-muted-foreground text-sm">
              Viewers can ask questions on your video and our ai agent will
              response
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
