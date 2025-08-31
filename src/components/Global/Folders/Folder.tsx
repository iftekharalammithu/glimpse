"use client";
import { renameFolders } from "@/Actions/Workspace";
import { Input } from "@/components/ui/input";
import { useMutationData, useMutationDataState } from "@/hook/useMutationData";
import { cn } from "@/lib/utils";
import { FolderClosed, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type FolderProps = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: FolderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [onRename, setOnRename] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderRef = useRef<HTMLDivElement | null>(null);

  const { mutate, isPending } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => {
      return renameFolders(id, data.name);
    },
    "workspace-folders",
    () => setOnRename(false)
  );

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handlDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setOnRename(true);
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id });
      } else {
        setOnRename(false);
      }
    }
  };
  const { latestVariables } = useMutationDataState(["rename-folder"]);

  return (
    <div
      onClick={() => handleFolderClick()}
      className={cn(
        optimistic && " opacity-60",
        "flex cursor-pointer items-center justify-between gap-2 rounded-lg border-[1px] min-w-[250px]  py-4 px-4 transition duration-150 hover:bg-neutral-800"
      )}
    >
      {false ? (
        <Loader2 className=" animate-spin"></Loader2>
      ) : (
        <div className=" flex justify-between w-full items-center">
          <div className=" flex flex-col gap-[1px]">
            {onRename ? (
              <Input
                autoFocus
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  updateFolderName(e)
                }
                placeholder={name}
                className=" border-none text-base outline-none bg-transparent   w-full p-0 text-neutral-50"
                ref={inputRef}
              ></Input>
            ) : (
              <p
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={handlDoubleClick}
                className=" text-neutral-300"
              >
                {latestVariables &&
                latestVariables.status === "pending" &&
                latestVariables.variables.id === id
                  ? latestVariables.variables.name
                  : name}
              </p>
            )}
            <span className=" text-sm text-neutral-500 ">
              {count || 0} Videos
            </span>
          </div>
          <FolderClosed></FolderClosed>
        </div>
      )}
    </div>
  );
};

export default Folder;
