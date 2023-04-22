import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import Switch from "@/components/Switch";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { MdPlaylistAdd, MdPodcasts } from "react-icons/md";
import { prisma } from "@/lib/prisma";
import axios from "axios";

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

const AddPodcasts = () => {
  const [isAudio, setIsAudio] = useState<boolean>(false);

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-playlists`);
      console.log(res.data.result);
      setPlaylists(res.data.result);
    };
    fetchPlaylists();
  }, []);

  return (
    <DefaultLayout>
      <SEO title="Add Podcasts" />
      <Breadcrumb pageName="Add Podcasts" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-2/5">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add Podcast</h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Podcast Title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter Podcast Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="flex justify-between mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Audio Podcast <span className="text-red-400">*</span>
                </label>
                <Switch isAudio={isAudio} setIsAudio={setIsAudio} />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Speaker <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Podcast Speaker"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Category <span className="text-red-400">*</span>
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <MdPodcasts fill="white" />
                  </span>
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">ARTS</option>
                    <option value="">BUSINESS</option>
                    <option value="">COMEDY</option>
                    <option value="">EDUCATION</option>
                    <option value="">PUBLIC</option>
                    <option value="">TECHNOLOGY</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <BsChevronDown fill="white" />
                  </span>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Playlist <span className="text-red-400">*</span>
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <MdPlaylistAdd size={20} fill="white" />
                  </span>
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">No Playlist</option>
                    {playlists.map((p: any) => {
                      return (
                        <option value="" key={p.id}>
                          {p.title}
                        </option>
                      );
                    })}
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <BsChevronDown fill="white" />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  accept={isAudio ? "audio/*" : "video/*"}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">Add Podcast</button>
            </div>
          </form>
        </div>
        <AllPodcasts />
      </div>
    </DefaultLayout>
  );
};

const AllPodcasts = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-3/5">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">All Podcasts</h4>
      </div>

      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-around">
        <div className="flex items-start">
          <p className="font-semibold">Podcast Title</p>
        </div>
        <div className="flex items-start">
          <p className="font-semibold">Category</p>
        </div>
        <div className="flex items-start">
          <p className="font-semibold">Playlist</p>
        </div>
        <div className="flex items-start">
          <p className="font-semibold">Aud/Vid</p>
        </div>
        <div className="flex items-start">
          <p className="font-semibold">Speaker</p>
        </div>
      </div>

      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-around">
        <div className="flex items-start">
          <p className="text-sm text-black dark:text-white">HP Probook 450</p>
        </div>
        <div className="flex items-start">
          <p className="text-sm text-black dark:text-white">Education</p>
        </div>
        <div className="flex items-start">
          <p className="text-sm text-black dark:text-white">TED TALKS</p>
        </div>
        <div className="flex items-start">
          <p className="text-sm text-black dark:text-white">Aud</p>
        </div>
        <div className="flex items-start">
          <p className="text-sm text-black dark:text-white">Sal Khan</p>
        </div>
      </div>
    </div>
  );
};

export default AddPodcasts;
