import React from "react";
import { TabsContent } from "../ui/tabs";

type VideoTranscriptProps = {
  transcript: string;
};

const VideoTranscript = ({ transcript }: VideoTranscriptProps) => {
  return (
    <TabsContent
      value="Transcript"
      className=" p-5 bg-gray-800 rounded-xl flex flex-col gap-y-6"
    >
      <p className=" text-gray-400">{transcript}</p>
    </TabsContent>
  );
};

export default VideoTranscript;
