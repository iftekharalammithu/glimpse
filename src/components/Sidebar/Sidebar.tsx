"use client";
import ImageLogo from "@/Component/ImageLogo";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useQueryData } from "@/hook/usequeryData";
import { getWorkscapes } from "@/Actions/Workspace";
import { NotificationProps, WorkspaceProps } from "@/types/page";
import { PlusCircle } from "lucide-react";
import Model from "../Global/Model";
import WorkspaceSearch from "../Search/Search";
import Search from "../Search/Search";
import { MenuItems } from "@/Constants";
import SideBarItems from "./SideBarItems";
import { getNotification } from "@/Actions/User";
import WorkplaceHolder from "./WorkplaceHolder";

type SidebarProps = {
  actionWorkspaceId: string;
};

const Sidebar = ({ actionWorkspaceId }: SidebarProps) => {
  const router = useRouter();

  const { data, isFetched } = useQueryData(["user-workspace"], getWorkscapes);

  const { data: workspace } = data as WorkspaceProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  // console.log("workspace", workspace);
  // console.log("actionWorkspaceId", actionWorkspaceId);

  const currentWorkspace = workspace.workspace.find(
    (s) => s.id === actionWorkspaceId
  );
  const menuItems = MenuItems(actionWorkspaceId);

  const pathName = usePathname();

  const { data: notification } = useQueryData(
    ["user-notification"],
    getNotification
  );

  const { data: count } = notification as NotificationProps;
  return (
    <div className=" bg-background flex-none relative p-4 h-full w-[250px] overflow-hidden flex-col flex gap-4 items-center ">
      <div className=" bg-background p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0  right-0">
        <ImageLogo></ImageLogo>
      </div>
      <Select
        defaultValue={actionWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className=" mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a Workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className=" bg-background backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <Separator></Separator>
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan === "PRO" && (
          <Model
            title={"Invite To Workspace"}
            trigger={
              <span className=" text-sm cursor-pointer flex items-center justify-center bg-neutral-800/70 hover:bg-neutral-800/60 w-full gap-2 rounded-sm p-[5px]">
                <PlusCircle
                  size={15}
                  className=" text-neutral-800/90 fill-neutral-500"
                ></PlusCircle>
                <span className=" text-neutral-300 font-semibold text-xs">
                  Invite To WorkSpace
                </span>
              </span>
            }
            description="Invite other users to your workspace"
          >
            <Search workspaceId={actionWorkspaceId}></Search>
          </Model>
        )}
      <p className=" w-full text-text2  font-bold mt-4">Menu</p>
      <nav className=" w-full">
        <ul>
          {menuItems.map((item) => (
            <SideBarItems
              key={item.title}
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              notification={
                (item.title === "Notification" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className=" w-4/5"></Separator>
      <p className=" w-full text-text2 font-bold mt-4">Workspaces</p>
      <nav className=" w-full">
        <ul className=" h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 1 &&
            workspace.workspace.map((item) => (
              <SideBarItems
                key={item.id}
                href={`/dashboard/${item.id}`}
                selected={pathName === `/dashboard/${item.id}`}
                title={item.name}
                notification={0}
                icon={<WorkplaceHolder>{item.name.charAt(0)}</WorkplaceHolder>}
              />
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
