import React from "react";
import { createPopper } from "@popperjs/core";
import Image from "next/image";
import Link from "next/link";

const UserDropdown = () => {
  // dropdown props
  return (
    <>
      <Link
        className="text-blueGray-500 block"
        href="/profile"
        // onClick={(e) => {
        //   e.preventDefault();
        //   dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        // }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <Image width={8} height={8} className="w-8 h-8 rounded-full" src="/image/food-bg.jpg" alt="user photo"/>
          </span>
        </div>
      </Link>
    </>
  );
};

export default UserDropdown;
