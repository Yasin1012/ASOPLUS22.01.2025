"use client";

import { useAuth } from "@/app/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user } = useAuth();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 bg-[#001529] text-white flex items-center justify-end px-6">
      {user && (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.prefs?.avatarUrl}  alt={user.name} />
            <AvatarFallback className="text-[#001529] font-semibold font-poppins cursor-pointer">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium font-poppins cursor-pointer">{user.name}</span>
        </div>
      )}
    </header>
  );
}
