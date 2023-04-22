import SEO from "@/components/SEO";
import { Lobster } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

const NotFound = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <SEO title="Page Not Found" />
      <Link href="/">
        <div className="flex justify-center items-center -space-x-3 shrink-0">
          <Image src="/amplifier.svg" alt="Amplifier" height="100" width="110" className="hover:cursor-pointer" />
          <div className={`${lobster.className} text-5xl -mt-5 hover:cursor-pointer`}>Amplifier</div>
        </div>
      </Link>
      <hr className="w-full -my-2" />
      <div className="w-full items-center flex flex-col justify-center">
        <Image src="/404.png" alt="Amplifier" height="500" width="500" />
        <Link href="/">
          <button className="hover:bg-blue-600 bg-blue-700 text-white font-bold py-2 px-6 rounded-full">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
