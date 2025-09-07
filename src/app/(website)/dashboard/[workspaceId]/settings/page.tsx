"use client";
import { enableFirstView, getFirstView } from "@/Actions/User";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ComputerIcon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingPage = () => {
  const [firstView, setfirstView] = useState<undefined | boolean>(undefined);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (firstView !== undefined) {
      return;
    }
    const fetchData = async () => {
      const res = await getFirstView();
      if (res.status === 200) {
        setfirstView(res.data);
      }
    };
    fetchData();
  }, [firstView]);

  const switchState = async (checked: boolean) => {
    const view = await enableFirstView(checked);
    if (view) {
      toast.success(view.status === 200 ? "Success" : "Failed", {
        description: view.data,
      });
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className=" lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "system" && "border-purple-800"
            )}
            onClick={() => setTheme("system")}
          >
            <ComputerIcon></ComputerIcon>
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "light" && "border-purple-800"
            )}
            onClick={() => setTheme("light")}
          >
            <Sun></Sun>
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-purple-800"
            )}
            onClick={() => setTheme("dark")}
          >
            <MoonIcon></MoonIcon>
          </div>
        </div>
      </div>
      <h2 className=" text-2xl font-bold mt-4">Video Sharing Settings</h2>
      <p className=" text-muted-foreground">
        Enabling this feature will send you notifications when some watched your
        video for the first time. This feature can help during client outreach
      </p>
      <Label className=" flex items-center gap-x-3 mt-4 font-medium">
        Enable First View
        <Switch
          onCheckedChange={switchState}
          disabled={firstView === undefined}
          checked={firstView}
          onClick={() => setfirstView(!firstView)}
        ></Switch>
      </Label>
    </div>
  );
};

export default SettingPage;
