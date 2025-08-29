import React, { ReactNode } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

type GlobalcardsProps = {
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
};

const Globalcards = ({
  title,
  description,
  children,
  footer,
}: GlobalcardsProps) => {
  return (
    <Card className=" bg-transparent   w-full">
      <CardHeader className=" p-4">
        <CardTitle className=" text-md text-text2">{title}</CardTitle>
        <CardDescription className=" text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className=" pt-4 ">{children}</div>}
      {footer && <CardFooter className=" p-4">{footer}</CardFooter>}
    </Card>
  );
};

export default Globalcards;
