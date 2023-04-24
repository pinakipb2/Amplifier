import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineAudio, AiOutlineVideoCamera } from "react-icons/ai";
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
  const pid = context.params.pod_id;
  const res = await prisma.podcast.findUnique({
    where: {
      id: pid,
    },
    include: {
      playlist: true,
    },
  });
  console.log(removeKeyFromObject(res, "createdAt"));
  return {
    props: { podcast: JSON.parse(JSON.stringify(res)) },
  };
}

const PodcastPage = ({ podcast }) => {
  return (
    <UserLayout>
      <SEO title={podcast.name} />
      <div className="p-4">
        <div className="justify-center flex items-center">
          {podcast.type === "AUDIO" ? (
            <audio controls className="h-10 w-full px-4 justify-center flex items-center">
              <source src={podcast.podcast_url} />
            </audio>
          ) : (
            <video controls className="h-125 justify-center flex items-center">
              <source src={podcast.podcast_url} />
            </video>
          )}
        </div>
        <div className="flex flex-col pb-4">
          <h1 className="text-lg my-6">{podcast.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={podcast.playlist.image} alt="Podcast Image" width={40} height={40} />
              <div className="flex flex-col ml-3">
                <h1 className="text-white">{podcast.playlist.title}</h1>
                <span className="text-zinc-300 text-sm">{podcast.speaker}</span>
              </div>
            </div>
            <div className="flex justify-evenly">
              <AiOutlineHeart size={25} className="hover:cursor-pointer" />
              {podcast.type === "AUDIO" ? <AiOutlineAudio size={25} className="mx-4 hover:cursor-pointer" /> : <AiOutlineVideoCamera size={25} className="mx-4 hover:cursor-pointer" />}
            </div>
          </div>
        </div>
        <p className="text-justify">{podcast.description}</p>
      </div>
    </UserLayout>
  );
};

export default PodcastPage;
