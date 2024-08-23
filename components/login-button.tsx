"use client";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LoginButton = () => {
  const handleLogin = () => {
    toast("Coming soon!", {
      position: "top-right",
    });
  };
  return (
    <Button
      onClick={handleLogin}
      size={"sm"}
      variant={"ghost"}
      className="text-white text-sm font-semibold flex items-center"
    >
      <LogIn size={16} />
      <span className="ml-2">Login</span>
    </Button>
  );
};

export default LoginButton;
