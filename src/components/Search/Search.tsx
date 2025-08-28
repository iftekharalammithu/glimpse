import { useMutationData } from "@/hook/useMutationData";
import { useSearch } from "@/hook/useSearch";
import React from "react";
import { Input } from "../ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlusCircle, User } from "lucide-react";
import { Button } from "../ui/button";

type WorkspaceSearchProps = {
  workspaceId: string;
};

const Search = ({ workspaceId }: WorkspaceSearchProps) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    "get-user",
    "USER"
  );

  // const { mutate, isPending } = useMutationData(
  //   ["invite-member"],
  //   (data: { receiverId: string; email: string }) => {
  //     inviteMember();
  //   }
  // );

  return (
    <div className=" gap-y-5 flex flex-col">
      <Input
        onChange={onSearchQuery}
        value={query}
        className=" bg-transparent border-2 outline-none"
        placeholder=" Search for you user"
        type="text"
      ></Input>
      {isFetching ? (
        <div className=" flex flex-col gap-y-2">
          <Skeleton className=" w-full h-8 rounded-xl"></Skeleton>{" "}
        </div>
      ) : !onUsers ? (
        <p className=" text-center text-sm text-[#a4a4a4]">No User Found</p>
      ) : (
        <div>
          {onUsers.map((user) => (
            <div
              key={user.id}
              className=" flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              <Avatar>
                <AvatarImage src={user.image as string}></AvatarImage>
                <AvatarFallback>
                  <User></User>
                </AvatarFallback>
                <div className=" flex flex-col items-start">
                  <h3 className=" font-bold text-lg capitalize">
                    {user.firstname} {user.lastname}
                  </h3>
                  <p className=" lowercase text-xs bg-white px-2 rounded-lg  text-[#1e1e1e]">
                    {user.subscription?.plan}
                  </p>
                </div>
                <div className=" flex-1 flex justify-end  items-center">
                  <Button
                    onClick={() => {}}
                    variant={"default"}
                    className=" w-5/12 font-bold"
                  >
                    <PlusCircle></PlusCircle> Invite
                  </Button>
                </div>
              </Avatar>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
