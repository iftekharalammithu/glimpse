import type z from "zod/v3";
import { useMutationData } from "./useMutationData";
import { useQueryData } from "./usequeryData";
import useZodForm from "./useZodForm";
import { CommonFormSchema } from "@/components/Forms/CommentForm/Schema";
import { createCommentAndReply, getUserProfile } from "@/Actions/User";

const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQueryData(["user-profile"], getUserProfile);

  const { status, data: user } = data as {
    status: string;
    data: {
      id: string;
      image: string;
    };
  };

  const { mutate, isPending } = useMutationData(
    ["new-comment"],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    "video-comments",
    () => reset()
  );

  const { register, onFormSubmit, errors, reset } = useZodForm(
    CommonFormSchema,
    mutate
  );

  return { register, errors, onFormSubmit, isPending };
};

export default useVideoComment;
