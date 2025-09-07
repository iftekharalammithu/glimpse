import FormGenerator from "@/components/Global/FormGenerator";
import { Button } from "@/components/ui/button";
import useVideoComment from "@/hook/useVideo";
import { X, Loader2, Send } from "lucide-react";
import React from "react";

type CommentFormProps = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};

const CommentForm = ({
  videoId,
  commentId,
  author,
  close,
}: CommentFormProps) => {
  const { errors, register, onFormSubmit, isPending } = useVideoComment(
    videoId,
    commentId
  );
  return (
    <form onSubmit={onFormSubmit} className=" relative w-full ">
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Response to ${author}`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      ></FormGenerator>
      <Button
        className=" p-0 bg-transparent top-[1px] absolute border-2 right-3 hover:bg-transparent"
        type="submit"
      >
        {isPending ? (
          <Loader2 className=" animate-spin"></Loader2>
        ) : (
          <Send
            className=" text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          ></Send>
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
