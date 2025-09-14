import React from "react";
import Model from "../../Model";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditVideoMode from "@/components/Forms/EditVideo/EditVideoMode";

type EditVideoProps = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideo = ({ videoId, title, description }: EditVideoProps) => {
  return (
    <Model
      title="Edit Video Details"
      description="You can update your vide ddetail here"
      trigger={
        <Button variant={"ghost"} className="">
          <Edit className=" text-gray-500"></Edit>
        </Button>
      }
    >
      <EditVideoMode
        videoId={videoId}
        title={title as string}
        description={description as string}
      ></EditVideoMode>
    </Model>
  );
};

export default EditVideo;
