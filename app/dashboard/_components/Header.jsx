"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const path = usePathname();

  return (
    <div className="flex py-4 px-5 items-center justify-between bg-secondary shadow-sm">
      <div className="flex items-center mr-4">
        <Image
          src={"/logo.svg"}
          width={30}
          height={60}
          alt="ai-interview mocker"
          className="mr-3 w-8"
        />

        <h1>AI Interview Mocker</h1>
      </div>

      <ul className="hidden md:flex items-center gap-6">
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-semibold transition-all"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path == "/dashboard/questions" &&
            "text-primary font-semibold transition-all"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" &&
            "text-primary font-semibold transition-all"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path == "/dashboard/howitworks" &&
            "text-primary font-semibold transition-all"
          }`}
        >
          How it Works?
        </li>
        <UserButton />
      </ul>
    </div>
  );
};

export default Header;
