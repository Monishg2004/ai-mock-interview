import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center">
        <Image
          src={"/logo.svg"}
          width={40}
          height={60}
          alt="ai-interview mocker"
          className="mr-5"
        />

        <h1>AI Interview Mocker</h1>

        <ul>
          <li>Dashboard</li>
          <li>Questions</li>
          <li>Upgrade</li>
          <li>How it Works?</li>
        </ul>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
