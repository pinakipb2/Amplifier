import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlinePlayCircle, AiOutlineHeart, AiOutlineAudio, AiOutlineVideoCamera } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import UserLayout from "@/components/layout/UserLayout";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SEO from "@/components/SEO";

function removeKeyFromObject(obj, key) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (prop === key) {
        delete obj[prop];
      } else if (typeof obj[prop] === "object") {
        removeKeyFromObject(obj[prop], key);
      }
    }
  }
  return obj;
}

export async function getServerSideProps(context) {
  const pid = context.params.pid;
  const res = await prisma.podcastPlaylist.findUnique({
    where: {
      id: pid,
    },
    include: {
      Podcast: true,
    },
  });
  console.log(removeKeyFromObject(res, "createdAt"));
  return {
    props: { podcasts: JSON.parse(JSON.stringify(res)) },
  };
}

const PlaylistPage = ({ podcasts }) => {
  console.log(podcasts);

  // const router = useRouter();
  // const { pid } = router.query;
  const pid = "audio";
  return (
    <UserLayout>
      <SEO title={podcasts.title} />
      <div className="p-4">
        <div className="flex justify-between pb-4 gap-6">
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <h1 className="text-2xl">{podcasts.title}</h1>
              <span className="text-md text-zinc-300">{podcasts.speaker}</span>
            </div>
            <div className="text-justify">{podcasts.description}</div>
          </div>
          <Image src={podcasts.image} alt="image" width={100} height={100} className="w-50 h-50" />
        </div>
        <h1 className="my-6 text-2xl">Available episodes</h1>
        {podcasts.Podcast.map((p) => (
          <div className="mt-6" key={p.id}>
            <Link href={`/podcast/${p.id}`}>
              <h1 className="text-lg font-semibold">{p.name}</h1>
              <p className="line-clamp-3 text-justify">{p.description}</p>
              <div className="flex my-4 items-center">
                <div className="rounded-full border flex items-center p-2">
                  <HiUserCircle size={20} />
                  <div className="ml-2 text-white">{p.speaker}</div>
                </div>
                <AiOutlineHeart className="mx-4" size={25} />
                {p.type === "AUDIO" ? <AiOutlineAudio size={25} /> : <AiOutlineVideoCamera size={25} />}
              </div>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default PlaylistPage;
