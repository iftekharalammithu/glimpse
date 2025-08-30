import CrateWorkspace from "@/components/CrateWorkspace/CrateWorkspace";
import CreateFolders from "@/components/Global/CreateFolders";
import Folders from "@/components/Global/Folders/Folders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = async (props: { params: { workspaceId: string } }) => {
  const { workspaceId } = await props.params;

  return (
    <div>
      <Tabs defaultValue="videos" className="  mt-6">
        <div className=" flex w-full justify-between items-center">
          <TabsList className=" bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className=" flex gap-x-3 ">
            <CrateWorkspace></CrateWorkspace>
            <CreateFolders workspaceId={workspaceId}></CreateFolders>
          </div>
        </div>
        <section className=" py-9">
          <TabsContent value="videos">
            <Folders workspaceId={workspaceId}></Folders>
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default page;
