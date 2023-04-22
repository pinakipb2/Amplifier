import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import { getSession } from "next-auth/react";
import SEO from "@/components/SEO";
import Image from "next/image";

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  // @ts-ignore
  if (session && session.user!.role !== "admin") {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const PodcastPlaylists = () => {
  return (
    <DefaultLayout>
      <SEO title="Podcast Playlists" />
      <Breadcrumb pageName="Podcast Playlists" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-2/5">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add Podcast Playlist</h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Playlist Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Podcast Playlist Title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Podcast Playlist Description</label>
                <textarea
                  rows={6}
                  placeholder="Enter Podcast Playlist Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">Podcast Playlist Image</label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                />
                <p className="italic text-sm text-white/60 pt-1">Only .png, .jpg and .jpeg is accepted</p>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">Add Podcast Playlist</button>
            </div>
          </form>
        </div>
        <AllPlaylists />
      </div>
    </DefaultLayout>
  );
};

const AllPlaylists = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-3/5">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">All Podcast Playlists</h4>
      </div>

      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
        <div className="flex items-center">
          <p className="font-semibold">Playlist Name</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold">No. of Podcasts</p>
        </div>
      </div>

      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={`https://api.dicebear.com/6.x/fun-emoji/png?seed=hi`} alt="Prod" height="80" width="90" className="rounded-md" />
            </div>
            <p className="text-sm text-black dark:text-white">HP Probook 450</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-meta-3">103</p>
        </div>
      </div>
      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={`https://api.dicebear.com/6.x/fun-emoji/png?seed=hi`} alt="Prod" height="80" width="90" className="rounded-md" />
            </div>
            <p className="text-sm text-black dark:text-white">HP Probook 450</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-meta-3">103</p>
        </div>
      </div>
      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={`https://api.dicebear.com/6.x/fun-emoji/png?seed=hi`} alt="Prod" height="80" width="90" className="rounded-md" />
            </div>
            <p className="text-sm text-black dark:text-white">HP Probook 450</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-meta-3">103</p>
        </div>
      </div>
      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={`https://api.dicebear.com/6.x/fun-emoji/png?seed=hi`} alt="Prod" height="80" width="90" className="rounded-md" />
            </div>
            <p className="text-sm text-black dark:text-white">HP Probook 450</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-meta-3">103</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlaylists;
