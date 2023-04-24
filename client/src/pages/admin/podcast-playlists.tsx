import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/layout/DefaultLayout";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import SEO from "@/components/SEO";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
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

const PodcastPlaylists = () => {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const fetchAllPlaylist = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-playlists`);
        setPlaylist(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlaylist();
  }, []);

  const titleSchema = z.string().min(1, "Title must contain at least 1 character").max(60, "Title must contain at most 60 characters").trim();
  const descriptionSchema = z.string().min(1, "Description must contain at least 1 character").max(200, "Description must contain at most 200 characters").trim();

  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const imageSchema = z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported.");
  const playlistSchema = z
    .object({
      title: titleSchema,
      description: descriptionSchema,
      image: imageSchema,
    })
    .strict();
  type playlistSchemaType = z.infer<typeof playlistSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<playlistSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(playlistSchema),
  });

  const onSubmit: SubmitHandler<playlistSchemaType> = async (data) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const srcData = fileReader.result;
        // console.log(srcData);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add-playlist`, { title: data.title, description: data.description, image: srcData });
        //@ts-ignore
        setPlaylist((oldPlaylist) => [...oldPlaylist, res.data.result]);
      };
      fileReader.readAsDataURL(data.image[0]);
      toast.success("Uploaded!");
      reset();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <DefaultLayout>
      <SEO title="Podcast Playlists" />
      <Breadcrumb pageName="Podcast Playlists" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-2/5">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add Podcast Playlist</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Playlist Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Podcast Playlist Title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("title")}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Podcast Playlist Description</label>
                <textarea
                  rows={6}
                  placeholder="Enter Podcast Playlist Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("description")}
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">Podcast Playlist Image</label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                  {...register("image")}
                />
                <p className="italic text-sm text-white/60 pt-1">Only .jpg, .jpeg, .png and .webp formats are supported.</p>
              </div>

              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Add Podcast Playlist
              </button>
            </div>
          </form>
        </div>
        {/* @ts-ignore */}
        <AllPlaylists playlist={playlist} key={playlist} />
      </div>
    </DefaultLayout>
  );
};

const AllPlaylists = ({ playlist }) => {
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
          <p className="font-semibold">Description</p>
        </div>
      </div>
      {playlist.length > 0 &&
        playlist?.map((p) => {
          return (
            <div key={p?.id} className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-between">
              <div className="flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">{p.image && <Image src={p?.image} alt="playlists" height="80" width="90" className="rounded-md" />}</div>
                  <p className="text-sm text-black dark:text-white">{p?.title}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-white">{p?.description?.slice(0, 100) + "..."}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PodcastPlaylists;
