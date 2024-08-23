import Image from "next/image";
import { PropsWithChildren } from "react";
import Navbar from "./_components/navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Image src={"/images/bg.png"} alt="" fill className="-z-10" />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
