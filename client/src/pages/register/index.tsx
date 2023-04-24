import SEO from "@/components/SEO";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { getSession, signIn } from "next-auth/react";
import { Lobster } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  // @ts-ignore
  if (session && session.user!.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL });
  };
  const noSpacesRegex = /^[^\s]+$/;
  const emailSchema = z.string().min(4, "Email must contain at least 4 characters").max(60, "Email must contain at most 60 characters").email("Please enter a valid email").trim();
  const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(50, "Password must contain at most 50 characters")
    .regex(noSpacesRegex, "Password cannot contain spaces")
    .trim();
  const registerSchema = z
    .object({
      email: emailSchema,
      password: passwordSchema,
      name: z.string().trim(),
    })
    .strict();
  type registerSchemaType = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<registerSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit: SubmitHandler<registerSchemaType> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, { name: data.name, email: data.email, password: data.password });
      toast.success("Account Created !");
      reset();
    } catch (err: any) {
      toast.error(err.response.data.message, { id: err.response.data.message });
    }
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <SEO title="Sign Up" />
      <Link href="/">
        <div className="flex justify-center items-center -space-x-3 shrink-0">
          <Image src="/amplifier.svg" alt="Amplifier" height="100" width="110" className="hover:cursor-pointer" />
          <div className={`${lobster.className} text-5xl -mt-5 hover:cursor-pointer`}>Amplifier</div>
        </div>
      </Link>
      <hr className="w-full -my-2" />
      <div className="w-full flex flex-col p-10 my-6 justify-center items-center">
        <div className="xl:w-[35%] md:w-[50%] flex flex-col">
          <h1 className="text-center mb-5 font-semibold text-2xl">Sign up for free to start enjoying.</h1>
          <button
            className="flex justify-center items-center space-x-2 p-4 rounded-full border-green-500 border-2 hover:bg-neutral-900 font-medium"
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            <FcGoogle size={25} className="shrink-0" /> <span className="whitespace-nowrap">Sign up With Google</span>
          </button>
          <div className="flex my-5 justify-center items-center">
            <hr className="w-full" />
            <span className="mx-6 font-bold">OR</span>
            <hr className="w-full" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <h1 className="py-2">What&apos;s your email?</h1>
              <input
                type="text"
                placeholder="Email your email."
                className={classNames(["rounded-md w-full p-4 text-black"], [errors.email && "border-[3px] border-red-500 focus:outline-red-600"])}
                {...register("email")}
              />
              {errors.email && <p className="text-white text-sm italic pt-1">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col mt-4">
              <h1 className="py-2">Create a Password</h1>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Create a Password."
                  className={classNames(["rounded-md w-full p-4 text-black pr-11"], [errors.password && "border-[3px] border-red-500 focus:outline-red-600"])}
                  {...register("password")}
                />
                <div
                  onClick={() => {
                    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
                  }}
                >
                  {isPasswordVisible ? (
                    <AiFillEye className="text-black absolute top-1 right-2 translate-y-1/2 hover:cursor-pointer" size={25} />
                  ) : (
                    <AiFillEyeInvisible className="text-black absolute top-1 right-2 translate-y-1/2 hover:cursor-pointer" size={25} />
                  )}
                </div>
              </div>
              {errors.password && <p className="text-white text-sm italic pt-1">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col my-4">
              <h1 className="py-2">What should we call you?</h1>
              <input
                type="text"
                placeholder="Enter a profile name."
                className={classNames(["rounded-md w-full p-4 text-black"], [errors.name && "border-[3px] border-red-500 focus:outline-red-600"])}
                {...register("name")}
              />
              <p className="text-sm pt-1">This appears on your profile.</p>
              {errors.name && <p className="text-white text-sm italic pt-1">{errors.name.message}</p>}
            </div>
            <div className="pt-4">
              <button
                className="rounded-full bg-green-500 hover:bg-transparent w-full p-4 text-lg text-neutral-800 font-extrabold hover:text-white border-2 border-black hover:border-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting || isValidating}
              >
                Sign Up
              </button>
            </div>
          </form>
          <hr className="mt-7" />
          <h1 className="text-center mt-8 mb-4 font-semibold">Have an account?</h1>
          <Link href="/login">
            <button className="flex justify-center items-center space-x-2 p-4 w-full rounded-full border-green-500 border-2 hover:bg-neutral-900 font-medium">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
