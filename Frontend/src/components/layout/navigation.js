import {
  House,
  Users,
  FolderKanban,
  Search,
  Sparkles,
  Inbox,
  MessageSquare,
  Bell,
  UserRound,
} from "lucide-react";

export const navigation = [
  { label: "Home", path: "/home", icon: House },
  { label: "Developers", path: "/developers", icon: Users },
  { label: "My Projects", path: "/projects", icon: FolderKanban },
  { label: "Recruitments", path: "/recruitments", icon: Search },
  { label: "Recommendations", path: "/recommendations", icon: Sparkles },
  { label: "Requests", path: "/requests", icon: Inbox },
  { label: "Messages", path: "/messages", icon: MessageSquare },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "My Profile", path: "/profile", icon: UserRound },
];