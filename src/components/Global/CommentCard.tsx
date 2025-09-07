import type { CommentRepliesProps } from "@/types/page";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";

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
        <Avatar>
          <AvatarImage src={author.image} alt="author"></AvatarImage>
        </Avatar>
        <p className=" capitalize text-sm text-gray-400">
          {author.firstname} {author.lastname}
        </p>
      </div>
    </Card>
  );
};

export default CommentCard;
