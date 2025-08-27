import React from "react";

const page = async (props: { params: { workspaceId: string } }) => {
  const { workspaceId } = await props.params;

  return <div>{workspaceId} </div>;
};

export default page;
