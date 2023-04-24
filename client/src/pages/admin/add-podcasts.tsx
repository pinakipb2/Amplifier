import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import Switch from "@/components/Switch";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { MdPlaylistAdd, MdPodcasts } from "react-icons/md";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";

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

  const [allPodcast, setAllPodcast] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-podcasts`);
      console.log(res.data.result);
      setAllPodcast(res.data.result);
      const p = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-playlists`);
      console.log(p.data.result);
      setPlaylists(p.data.result);
    };
    fetchPodcasts();
  }, []);

  const nameSchema = z.string().min(1, "Name must contain at least 1 character").max(60, "Name must contain at most 60 characters").trim();
  const descriptionSchema = z.string().min(1, "Description must contain at least 1 character").max(200, "Description must contain at most 200 characters").trim();
  const categorySchema = z.string();
  const podcastSpeakerSchema = z.string().min(1, "Speaker must contain at least 1 character").max(200, "Sperker must contain at most 200 characters").trim();
  const podcastPlaylistIdSchema = z.string();

  const MAX_FILE_SIZE = 50000000;
  const ACCEPTED_PODCAST_TYPES = ["audio/*", "video/*"];
  const podcastSchema = z.any().refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 500MB.`);
  const podcastFormSchema = z
    .object({
      name: nameSchema,
      description: descriptionSchema,
      category: categorySchema,
      speaker: podcastSpeakerSchema,
      podcastPlaylistId: podcastPlaylistIdSchema,
      podcast: podcastSchema,
    })
    .strict();
  type podcastFormSchemaType = z.infer<typeof podcastFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<podcastFormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(podcastFormSchema),
  });

  const onSubmit: SubmitHandler<podcastFormSchemaType> = async (data) => {
    var formData = new FormData();
    formData.append("file", data.podcast[0]);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploader`, formData);
      console.log(res.data.url);
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add-podcast`, {
        name: data.name,
        description: data.description,
        category: data.category,
        type: isAudio ? "AUDIO" : "VIDEO",
        speaker: data.speaker,
        podcastPlaylistId: data.podcastPlaylistId,
        podcast_url: res.data.url,
      });
      //@ts-ignore
      setAllPodcast((oldPodcast) => [...oldPodcast, resp.data.result]);
      reset();
      toast.success("Podcast Uploaded Successfully !");
    } catch (err) {
      console.log(err);
      toast.error("File Size too large", { id: "upload-err" });
    }
  };

  return (
    <DefaultLayout>
      <SEO title="Add Podcasts" />
      <Breadcrumb pageName="Add Podcasts" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-2/5">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add Podcast</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Podcast Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Podcast Title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("name")}
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
                  {...register("description")}
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
                  {...register("speaker")}
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
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    {...register("category")}
                  >
                    <option value="ARTS">ARTS</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="COMEDY">COMEDY</option>
                    <option value="EDUCATION">EDUCATION</option>
                    <option value="PUBLIC">PUBLIC</option>
                    <option value="TECHNOLOGY">TECHNOLOGY</option>
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
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    {...register("podcastPlaylistId")}
                  >
                    <option value="">No Playlist</option>
                    {playlists.map((p: any) => {
                      return (
                        <option value={p.id} key={p.id}>
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
                  {...register("podcast")}
                />
              </div>

              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Add Podcast
              </button>
            </div>
          </form>
        </div>
        {/* @ts-ignore */}
        <AllPodcasts allPodcast={allPodcast} key={allPodcast} />
      </div>
    </DefaultLayout>
  );
};

const AllPodcasts = ({ allPodcast }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-3/5">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">All Podcasts</h4>
      </div>

      <div className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-around">
        <div className="flex justify-center w-1/5">
          <p className="font-semibold">Podcast Title</p>
        </div>
        <div className="flex justify-center w-1/5">
          <p className="font-semibold">Category</p>
        </div>
        <div className="flex justify-center w-1/5">
          <p className="font-semibold">Playlist</p>
        </div>
        <div className="flex justify-center w-1/5">
          <p className="font-semibold">Aud/Vid</p>
        </div>
        <div className="flex justify-center w-1/5">
          <p className="font-semibold">Speaker</p>
        </div>
      </div>

      {allPodcast.map((p) => {
        return (
          <div key={p.id} className="flex border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center justify-around w-full">
            <div className="flex justify-center w-1/5">
              <p className="text-sm text-black dark:text-white">{p.name}</p>
            </div>
            <div className="flex justify-center w-1/5">
              <p className="text-sm text-black dark:text-white">{p.category}</p>
            </div>
            <div className="flex justify-center w-1/5">
              <p className="text-sm text-black dark:text-white">{p.playlist.title}</p>
            </div>
            <div className="flex justify-center w-1/5">
              <p className="text-sm text-black dark:text-white">{p.type}</p>
            </div>
            <div className="flex justify-center w-1/5">
              <p className="text-sm text-black dark:text-white">{p.speaker}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddPodcasts;
