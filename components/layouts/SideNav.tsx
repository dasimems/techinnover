import { LogoImage } from "@/assets/images";
import { allRoutes, siteName } from "@/utils/variables";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="desktop:max-w-[300px] desktop:w-[30vw] hidden tablet:flex flex-col sticky top-0 max-h-screen">
      <div className="p-10">
        <Image
          src={LogoImage}
          alt={`${siteName} logo`}
          className="desktop:max-w-[179.84px] desktop:w-full w-3 opacity-0 desktop:opacity-100"
        />
      </div>
      <ul className="flex flex-col">
        {allRoutes.map(({ path, label, Icon }, index) => (
          <li key={index} className="w-full">
            <Link
              href={path}
              className={`py-5 inline-flex gap-5 w-full items-center text-lg  uppercase font-medium after:w-2 after:absolute after:h-full after:top-0 after:right-0 relative px-10 ${
                pathname === path
                  ? "text-primary after:bg-primary bg-primary/10 "
                  : ""
              }`}
            >
              {Icon && (
                <span className="text-2xl">
                  <Icon />
                </span>
              )}
              <span className="hidden desktop:inline-block">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
