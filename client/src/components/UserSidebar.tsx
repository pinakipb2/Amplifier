import React, { useEffect, useRef } from "react";
// import { Link, useLocation } from 'react-router-dom'
import { useRouter } from "next/router";
import SidebarLinkGroup from "./SidebarLinkGroup";
// import Logo from "../images/logo/logo.svg";
// import Link from "./Link";
import { Lobster } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { RiHistoryLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

const UserSidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: Function }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const { data: session } = useSession();
  // console.log(session);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // // close on click outside
  useEffect(() => {
    // @ts-ignore
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      // @ts-ignore
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // // close if the esc key is pressed
  useEffect(() => {
    // @ts-ignore
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-black lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="flex items-center">
          <Image src="/amplifier.svg" alt="Amplifier" height="80" width="90" className="hover:cursor-pointer" />
          <div className={`${lobster.className} text-4xl -mt-5 -ml-2 hover:cursor-pointer text-white`}>Amplifier</div>
        </Link>

        <button ref={trigger} onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" aria-expanded={sidebarOpen} className="block lg:hidden">
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar px-6 flex flex-col overflow-y-auto duration-300 ease-linear">
        <div>
          <div className="mb-6 flex flex-col gap-1.5">
            <SidebarLinkGroup activeCondition={pathname === "/" || pathname.includes("/")}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    <Link
                      href="/"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        (pathname === "/") && "bg-graydark dark:bg-meta-4"
                      }`}
                    >
                      <AiFillHome size={20} />
                      Explore Podcasts
                    </Link>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
            <SidebarLinkGroup activeCondition={pathname === "/favourites" || pathname.includes("favourites")}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    {
                      // @ts-ignore
                      session?.user!.role === "admin" || session === null ? (
                        <Link
                          href="/login"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                        >
                          <FaHeart size={20} />
                          Favourite Podcasts
                        </Link>
                      ) : (
                        <Link
                          href="/favourites"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/favourites" || pathname.includes("favourites")) && "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <FaHeart size={20} />
                          Favourite Podcasts
                        </Link>
                      )
                    }
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
            <SidebarLinkGroup activeCondition={pathname === "/history" || pathname.includes("history")}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    {
                      // @ts-ignore
                      session?.user!.role === "admin" || session === null ? (
                        <Link
                          href="/login"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                        >
                          <RiHistoryLine size={20} />
                          History
                        </Link>
                      ) : (
                        <Link
                          href="/history"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/history" || pathname.includes("history")) && "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <RiHistoryLine size={20} />
                          History
                        </Link>
                      )
                    }
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
