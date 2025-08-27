import React, { ReactNode } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ModelProps = {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const Model = ({
  trigger,
  children,
  title,
  description,
  className,
}: ModelProps) => {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Model;
