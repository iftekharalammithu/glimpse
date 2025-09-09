import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type RichLinkProps = {
  title: string;
  description: string;
  id: string;
  source: string;
};

const RichLink = ({ title, description, id, source }: RichLinkProps) => {
  const copyRichText = async () => {
    try {
      const originalTitle = title;
      const thumbnail = `
        <a style="display: flex; flex-direction: column; gap: 10px" 
           href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
          <h3 style="text-decoration: none; color: black; margin: 0;">${originalTitle}</h3>
          <p style="text-decoration: none; color: black; margin: 0;">${description}</p>
          <video width="320" style="display: block" controls>
            <source 
              type="video/webm" 
              src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}" 
            />
          </video>
        </a>
      `;

      if (navigator.clipboard && (window as any).ClipboardItem) {
        // Use modern rich clipboard API
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([thumbnail], { type: "text/html" }),
            "text/plain": new Blob([thumbnail], { type: "text/plain" }),
          }),
        ]);
      } else {
        // Fallback: plain text only
        await navigator.clipboard.writeText(thumbnail);
      }

      toast.success("Embedded Link Copied", {
        description: "Successfully copied embedded link",
      });
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      toast.error("Copy failed", {
        description: "Your browser might not support rich copy",
      });
    }
  };

  return (
    <Button onClick={copyRichText} className="rounded-full">
      Get Embedded Code
    </Button>
  );
};

export default RichLink;
