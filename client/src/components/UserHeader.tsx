import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropdownUser from "./DropdownUser";
import { FiSearch } from "react-icons/fi";
import DropdownSearch from "./DropdownSearch";
import axios from "axios";

const UserHeader = (props: any) => {
  const [searchValue, setsearchValue] = useState("");
  const [requiredPodcast, setRequiredPodcast] = useState([]);
  const getSearchDropdown = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search-podcast`, { term: searchValue });
      console.log(res);
      setRequiredPodcast(res.data.result);
    } catch (err: any) {
      console.log(err);    
    }
  };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-black dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between lg:py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            aria-expanded={props.sidebarOpen}
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-white dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"}`}></span>
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"}`}></span>
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"}`}></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"}`}></span>
                <span className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"}`}></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden mt-2" href="/">
            <Image src="/amplifier.svg" alt="Amplifier" height="80" width="90" className="hover:cursor-pointer" />
          </Link>
        </div>

        <div className="sm:block">
            <div className="relative">
              <button onClick={getSearchDropdown} className="absolute top-1/2 left-0 -translate-y-1/2">
                <FiSearch size={20} />
              </button>

              <input onChange={(e) => setsearchValue(e.target.value)} type="text" placeholder="Search for Podcasts..." className="w-full bg-transparent pr-4 pl-9 focus:outline-none" />
            </div>
          {
            requiredPodcast?.length > 0 && (<div className="flex items-center gap-3 2xsm:gap-7 z-[1000000]">
            <ul className="flex items-center gap-2 2xsm:gap-4"></ul>

            <DropdownSearch podcast={requiredPodcast} setRequiredPodcast={setRequiredPodcast} />
          </div>) 
          }
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4"></ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
