import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/UserLayout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";

export default function Home() {
  // const { data: session } = useSession();
  // console.log(session);

  const [allPodcasts, setAllPodcasts] = useState([]);

  useEffect(() => {
    const fetchAllPod = async () => {
      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-podcasts`);
        console.log(resp.data);
        setAllPodcasts(resp.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPod();
  }, []);

  return (
    <UserLayout>
      <SEO />
      <h1 className="text-xl m-4">Popular And Trending</h1>
      <div className="flex">
        {allPodcasts?.map((item) => (
          <div key={item.id} className="flex flex-col rounded-lg border border-green-500 m-4 p-2 w-1/4">
            <Link href={`/podcast/${item.id}`}>
              <div className="flex items-center p-2">
                <Image src={item.playlist.image} alt="Podcast Image" width={40} height={40} />
                <div className="flex flex-col ml-3">
                  <h1 className="text-white">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
              <div className="text-white line-clamp-4 px-2">{item.description}</div>
              <div className="flex p-2 items-center justify-between">
                <div className="rounded-full border flex items-center p-2">
                  <TbCategory2 size={20} />
                  <div className="ml-2 text-white text-sm">{item.category}</div>
                </div>
                <AiOutlineHeart size={25} />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h1 className="text-xl m-4">ARTS</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "ARTS")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <h1 className="text-xl m-4">BUSINESS</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "BUSINESS")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <h1 className="text-xl m-4">COMEDY</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "COMEDY")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <h1 className="text-xl m-4">EDUCATION</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "EDUCATION")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <h1 className="text-xl m-4">PUBLIC</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "PUBLIC")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <h1 className="text-xl m-4">TECHNOLOGY</h1>
      <div className="flex">
        {allPodcasts
          ?.filter((p) => p.category === "TECHNOLOGY")
          .map((item) => (
            <Link key={item.id} href={`/playlist/${item.playlist.id}`}>
              <div className="flex flex-col ml-4">
                <Image src={item.playlist.image} alt="Podcast Image" width={100} height={100} />
                <div className="flex flex-col">
                  <h1 className="text-white line-clamp-1">{item.name}</h1>
                  <span className="text-zinc-300 text-sm">{item.speaker}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </UserLayout>
  );
}
