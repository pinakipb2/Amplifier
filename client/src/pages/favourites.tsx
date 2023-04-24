import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/UserLayout";
import React from "react";

const Favourites = () => {
  return (
    <UserLayout>
      <div className="flex flex-col justify-center items-center">
        <SEO title="Favourites" />
        <div className="!justify-start !items-start !flex !text-start w-full text-xl text-white font-semibold pt-4">Favourites</div>
        <div className="flex justify-center items-center mt-10">
          <div className="h-30 w-1/2 bg-graydark"></div>
          <div className="flex w-fit flex-col ml-3">
            <h1 className="text-white">Title</h1>
            <span className="text-zinc-300 text-sm">Playlist Name</span>
            <p className="line-clamp-3 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus
              sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac,
              ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis
              nibh a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo
              ultricies, viverra ullamcorper est euismod.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Favourites;
