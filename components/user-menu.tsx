"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface User {
  name: string;
  email: string;
}

export function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
      >
        👤 {user.name}
      </button>
      {open && (
        <Card className="absolute right-0 mt-2 w-48 z-50">
          <div className="text-sm text-gray-600 mb-3">
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <hr className="mb-3" />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSignOut}
            className="w-full"
          >
            Sign Out
          </Button>
        </Card>
      )}
    </div>
  );
}
