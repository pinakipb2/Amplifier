import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlinePlayCircle, AiOutlineHeart, AiOutlineAudio, AiOutlineVideoCamera } from "react-icons/ai";

const PlaylistPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div className="p-4">
      <div className="w-1/2 flex justify-between pb-4">
        <div className="flex flex-col">
          <div className="flex flex-col mb-4">
            <h1 className="text-2xl">Title</h1>
            <span className="text-md text-zinc-300">Subtitle</span>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus
            sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac,
            ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis nibh
            a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo
            ultricies, viverra ullamcorper est euismod.
          </div>
        </div>
        <Image src="/images.png" alt="image" width={150} height={50} />
      </div>
      <h1 className="my-6 text-2xl">Available episodes</h1>
      <div className="w-1/2">
        <span className="text-xs text-zinc-300">1 day ago</span>
        <h1>Title</h1>
        <p className="line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus sit
          amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac, ultrices
          ligula. Ut neque ligula.
        </p>
        <div className="flex my-4">
          <div className="rounded-full border flex items-center p-2">
            <AiOutlinePlayCircle size={20} />
            <div className="ml-2 text-white">5 min</div>
          </div>
          <AiOutlineHeart className="mx-4" size={25} />
          {pid === "audio" ? <AiOutlineAudio size={25} /> : <AiOutlineVideoCamera size={25} />}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
