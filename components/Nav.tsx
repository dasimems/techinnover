import moment from "moment";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaAngleDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import Modal from "./Modal";
import Image from "next/image";
import { LogoImage } from "@/assets/images";
import { allRoutes, siteName } from "@/utils/variables";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";

const Nav = () => {
  const date = new Date(),
    [mobileMenuOpened, setMobileMenuOpened] = useState(false),
    pathname = usePathname();
  const router = useRouter(),
    buttonClassName =
      "size-9 text-sm rounded-full border items-center inline-flex justify-center";

  useEffect(() => {
    setMobileMenuOpened(false);
  }, [router, pathname]);
  return (
    <>
      <div className="py-10 flex items-center justify-between gap-6 md:gap-20 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMobileMenuOpened((prevState) => !prevState);
            }}
            title={`${mobileMenuOpened ? "Close" : "Open"} mobile menu`}
            className="text-xl mr-4"
          >
            <RiMenuLine />
          </button>
          <h1 className="text-[clamp(1.2rem,5vw,1.5rem)] font-medium">
            {moment(date).format("D MMMM YYYY")}
          </h1>

          <button title="Slide left" className={buttonClassName}>
            <FaArrowLeft />
          </button>
          <button title="Slide right" className={buttonClassName}>
            <FaArrowRight />
          </button>
        </div>

        <div className="flex items-center gap-3 border-2 px-4 py-3 rounded-md">
          <p className="text-2xl">
            <CiFilter />
          </p>
          <p>Filters</p>
          <p>
            <FaAngleDown />
          </p>
        </div>
      </div>
      <Modal
        dialogEnterFromAnimation="-left-[90vh]"
        dialogEnterToAnimation="left-0"
        opened={mobileMenuOpened}
        onClose={() => {
          setMobileMenuOpened(false);
        }}
      >
        <div className="h-screen overflow-y-auto bg-white w-[95vw]">
          <div className="p-10 flex items-center gap-10 justify-between">
            <Image
              src={LogoImage}
              alt={`${siteName} logo`}
              className="max-w-[100px] flex-1"
            />

            <button
              title="Close mobile menu"
              onClick={() => {
                setMobileMenuOpened(false);
              }}
              className="text-3xl"
            >
              <MdClose />
            </button>
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
                  <span className="">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Nav;
