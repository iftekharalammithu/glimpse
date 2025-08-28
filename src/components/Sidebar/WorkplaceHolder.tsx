import React, { ReactNode } from "react";

type WorkplaceHolderProps = {
  children: ReactNode;
};

const WorkplaceHolder = ({ children }: WorkplaceHolderProps) => {
  return (
    <span className=" bg-gray-500 flex items-center font-bold  justify-center w-8 px-2 rounded-sm text-text2">
      {children}
    </span>
  );
};

export default WorkplaceHolder;
