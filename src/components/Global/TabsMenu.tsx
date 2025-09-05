import React, { type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type TabsMenuProps = {
  triggers: string[];
  children: ReactNode;
  defaultValue: string;
};

const TabsMenu = ({ triggers, children, defaultValue }: TabsMenuProps) => {
  return (
    <Tabs defaultValue={defaultValue} className=" w-full">
      <TabsList className=" flex justify-start bg-transparent">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className=" capitalize text-base data-[state=active]:bg-black"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabsMenu;
