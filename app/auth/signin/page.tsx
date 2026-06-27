"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Failed to sign in");
      } else {
        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign In
        </Button>
      </form>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 font-semibold mb-2">Demo Credentials:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>Admin: <span className="font-mono">admin</span> / <span className="font-mono">Admin@123</span></li>
          <li>Manager: <span className="font-mono">manager</span> / <span className="font-mono">Manager@123</span></li>
          <li>Tech: <span className="font-mono">tech1</span> / <span className="font-mono">Tech@123</span></li>
        </ul>
      </div>
    </div>
  );
}
