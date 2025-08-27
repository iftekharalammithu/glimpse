"use client";

import { useTheme } from "next-themes";

export default function Home() {
  const theme = useTheme();

  return (
    <div className=" flex h-screen gap-2 items-center justify-center ">
      Home
      <button onClick={() => theme.setTheme("dark")}>Dark</button>
      <button onClick={() => theme.setTheme("light")}>Light</button>
    </div>
  );
}
