import { Bell, CreditCard, File, Home, Settings } from "lucide-react";
import { ReactNode } from "react";

export const MenuItems = (
  workspaceId: string
): { title: string; href: string; icon: ReactNode }[] => [
  {
    title: "Home",
    href: `/dashboard/${workspaceId}/home`,
    icon: <Home></Home>,
  },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}`,
    icon: <File></File>,
  },
  {
    title: "Notification",
    href: `/dashboard/${workspaceId}/notification`,
    icon: <Bell></Bell>,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard></CreditCard>,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings></Settings>,
  },
];
