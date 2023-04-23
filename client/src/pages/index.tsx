import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/UserLayout";
import { AiOutlineHeart, AiOutlinePlayCircle } from "react-icons/ai";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const list1 = [
    {
      id: 1,
      title: "T1",
      image: "/images.png",
      sub: "s1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac, ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis nibh a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo ultricies, viverra ullamcorper est euismod.",
      duration: "5 min",
    },
    {
      id: 2,
      title: "T2",
      image: "/images.png",
      sub: "s2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac, ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis nibh a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo ultricies, viverra ullamcorper est euismod.",
      duration: "5 min",
    },
    {
      id: 3,
      title: "T3",
      image: "/images.png",
      sub: "s3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut aliquet velit. Cras viverra egestas metus vel viverra. Nullam et posuere magna. Ut facilisis velit nibh. Sed ac risus sit amet augue mattis luctus. Vestibulum tempus magna vitae gravida interdum. In lacus metus, lacinia non nulla in, fringilla egestas eros. Nam eget dui aliquet, molestie tellus ac, ultrices ligula. Ut neque ligula, accumsan eu tristique nec, finibus at augue. Vestibulum elementum pretium feugiat. Fusce mollis sem nisl, vitae porta metus fringilla ac. Nulla quis nibh a quam dapibus luctus consequat ac risus. Etiam ante augue, dignissim at leo sit amet, laoreet facilisis eros. Quisque egestas bibendum porta. Donec venenatis ipsum sit amet justo ultricies, viverra ullamcorper est euismod.",
      duration: "5 min",
    },
  ];
  return (
    <UserLayout>
      <SEO />
      <h1 className="text-xl m-4">Popular And Trending</h1>
      <div className="flex">
        {list1.map((item) => (
          <div key={item.id} className="flex flex-col rounded-lg border border-green-500 m-4 p-2 w-1/4">
            <div className="flex items-center p-2">
              <Image src={item.image} alt="Podcast Image" width={40} height={40} />
              <div className="flex flex-col ml-3">
                <h1 className="text-white">{item.title}</h1>
                <span className="text-zinc-300 text-sm">{item.sub}</span>
              </div>
            </div>
            <div className="text-white line-clamp-4">{item.description}</div>
            <div className="flex p-2 items-center justify-between">
              <div className="rounded-full border flex items-center p-2">
                <AiOutlinePlayCircle size={20} />
                <div className="ml-2 text-white">{item.duration}</div>
              </div>
              <AiOutlineHeart size={25} />
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-xl m-4">Popular And Trending</h1>
      <div className="flex">
        {list1.map((item) => (
          <div key={item.id} className="flex flex-col ml-4">
            <Image src={item.image} alt="Podcast Image" width={100} height={100} />
            <div className="flex flex-col">
              <h1 className="text-white line-clamp-1">{item.title}</h1>
              <span className="text-zinc-300 text-sm">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}
