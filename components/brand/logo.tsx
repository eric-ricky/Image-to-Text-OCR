import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ dark }: { dark?: boolean }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", { "text-slate-100": dark })}
    >
      <span className="sr-only">Home</span>

      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/images/ocr.png"
        alt="OCR Logo"
        width={28}
        height={28}
        priority
      />

      <span className="font-bold">OCR</span>
    </Link>
  );
};

export default Logo;
