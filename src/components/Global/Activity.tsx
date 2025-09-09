import React from "react";
import { string } from "zod/v3";
import { Tabs } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import CommentForm from "../Forms/CommentForm/CommentForm";
import CommentCard from "./CommentCard";
import { useQueryData } from "@/hook/usequeryData";
import { getVideoComment } from "@/Actions/User";
import type { VideoCommentProps } from "@/types/page";

type ActivityProps = {
  author: string;
  videoId: string;
};

const Activity = ({ author, videoId }: ActivityProps) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComment(videoId)
  );
  const { data: comments } = data as VideoCommentProps;
  return (
    <TabsContent
      value="Activity"
      className=" p-5 bg-gray-800 rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm author={author} videoId={videoId}></CommentForm>
      {comments.map((comment) => (
        <CommentCard
          comment={comment.comment}
          key={comment.id}
          author={{
            image: comment.User?.image!,
            firstname: comment.User?.firstname!,
            lastname: comment.User?.lastname!,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        ></CommentCard>
      ))}
    </TabsContent>
  );
};

export default Activity;
