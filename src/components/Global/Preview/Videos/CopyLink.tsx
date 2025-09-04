import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type CopyLinkProps = {
  videoId: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
};

const CopyLink = ({ videoId, className, variant }: CopyLinkProps) => {
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    );
    return toast.success("Copied", { description: "Link successfully Copied" });
  };

  return (
    <Button className={className} variant={variant} onClick={onCopyClipboard}>
      <Link2 size={20} className=" text-gray-700"></Link2>
    </Button>
  );
};

export default CopyLink;
