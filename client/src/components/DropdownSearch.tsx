import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Link from "next/link";

const DropdownSearch = ({ podcast, setRequiredPodcast }) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    // @ts-ignore
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      // @ts-ignore
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      // setDropdownOpen(false);
      setRequiredPodcast([]);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    // @ts-ignore
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      // setDropdownOpen(false);
      setRequiredPodcast([]);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const router = useRouter();

  return (
    <div className="relative" ref={trigger}>
      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setRequiredPodcast([])}
        className={`absolute -left-1/4 max-h-150 mt-4 flex w-150 pr-10 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-3.5 py-4 text-sm font-medium duration-300 ease-in-out hover:text-white lg:text-base">
          {podcast.map((item) => (
            <Link href={`/podcast/${item.id}`} key={item.id}>
              <div className="bg-neutral-900 flex flex-col rounded-lg border border-green-500 m-4 p-2 w-full hover:cursor-pointer">
                <div className="flex items-center p-2">
                  <Image src={item.playlist.image} alt="Podcast Image" width={40} height={40} />
                  <div className="flex flex-col ml-3">
                    <h1 className="text-white text-start">{item.name}</h1>
                    <span className="text-zinc-300 text-sm">{item.speaker}</span>
                  </div>
                </div>
                <div className="text-white line-clamp-1 px-2">{item.description}</div>
                <div className="flex p-2 items-center justify-between">
                  <div className="rounded-full border flex items-center p-2">
                    <AiOutlinePlayCircle size={20} />
                    <div className="ml-2 text-white text-xs">{item.category}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownSearch;
