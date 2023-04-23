import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineAudio, AiOutlineVideoCamera } from "react-icons/ai";

const PodcastPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div className="p-4 w-1/2">
      <div className="h-30 bg-graydark"></div>
      <div className="flex flex-col pb-4">
        <h1 className="text-lg my-2">Title of podcast</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/images.png" alt="Podcast Image" width={40} height={40} />
            <div className="flex flex-col ml-3">
              <h1 className="text-white">Playlist</h1>
              <span className="text-zinc-300 text-sm">6 days ago</span>
            </div>
          </div>
          <div className="flex justify-evenly">
            <AiOutlineHeart size={25} /> 
            <AiOutlineAudio size={25} className="mx-4" />
            <AiOutlineVideoCamera size={25} />
          </div>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus
            sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac,
            ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis nibh
            a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo
            ultricies, viverra ullamcorper est euismod.</p>
    </div>
  );
};

export default PodcastPage;
