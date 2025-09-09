import type { CommentRepliesProps } from "@/types/page";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CommentForm from "../Forms/CommentForm/CommentForm";

type AuthorProps = {
  image: string;
  firstname: string;
  lastname: string;
};

type CommentCardProps = {
  comment: string;
  author: AuthorProps;
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: CommentCardProps) => {
  const [onReply, setOnReply] = useState<boolean>(false);

  return (
    <Card
      className={cn(
        isReply
          ? "bg-gray-800 pl-10 border-none"
          : "border-[1px] bg-gray-800 p-5 "
      )}
    >
      <div className=" flex gap-x-2 items-center">
        <Avatar className=" w-6 h-6">
          <AvatarImage src={author.image} alt="author"></AvatarImage>
        </Avatar>
        <p className=" capitalize text-sm text-gray-400">
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div>
        <p className=" text-gray-400">{comment}</p>
      </div>
      {!isReply && (
        <div className=" flex justify-end mt-3">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className=" text-sm rounded-full bg-gray-800 text-white hover:text-gray-800"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              close={() => setOnReply(false)}
              videoId={videoId}
              commentId={commentId}
              author={author.firstname + " " + author.lastname}
            ></CommentForm>
          )}
        </div>
      )}
      {reply.length > 0 && (
        <div className=" flex flex-col gap-y-10 mt-5">
          {reply.map((r) => (
            <CommentCard
              isReply
              reply={[]}
              comment={r?.comment!}
              commentId={r?.commentId!}
              videoId={videoId}
              key={r?.id}
              author={{
                image: r?.User.image!,
                firstname: r?.User.firstname!,
                lastname: r?.User.lastname!,
              }}
            ></CommentCard>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
