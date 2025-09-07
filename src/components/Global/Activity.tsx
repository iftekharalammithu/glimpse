import React from "react";
import { string } from "zod/v3";
import { Tabs } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import CommentForm from "../Forms/CommentForm/CommentForm";
import CommentCard from "./CommentCard";

type ActivityProps = {
  author: string;
  videoId: string;
};

const Activity = ({ author, videoId }: ActivityProps) => {
  return (
    <TabsContent
      value="Activity"
      className=" p-5 bg-gray-800 rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm author={author} videoId={videoId}></CommentForm>
      <CommentCard
        comment={Comment.comment}
        key={Comment.id}
        author={}
        videoId={videoId}
        reply={Comment.reply}
        commentId={comment.id}
      ></CommentCard>
    </TabsContent>
  );
};

export default Activity;
