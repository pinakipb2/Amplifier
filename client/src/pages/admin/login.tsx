import SEO from "@/components/SEO";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { getSession, signIn } from "next-auth/react";
import { Lobster } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { z } from "zod";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  // @ts-ignore
  if (session && session.user!.role === "admin") {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const AdminLogin = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.error) {
      toast.error("Check Your Credentials", { id: "check-credentials" });
    }
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const noSpacesRegex = /^[^\s]+$/;
  const emailSchema = z.string().min(4, "Email must contain at least 4 characters").max(60, "Email must contain at most 60 characters").email("Please enter a valid email").trim();
  const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(50, "Password must contain at most 50 characters")
    .regex(noSpacesRegex, "Password cannot contain spaces")
    .trim();
  const loginSchema = z
    .object({
      email: emailSchema,
      password: passwordSchema,
    })
    .strict();
  type loginSchemaType = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<loginSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@amplifier.com",
      password: "12345678",
    },
  });
  const onSubmit: SubmitHandler<loginSchemaType> = async (data) => {
    const status: { ok: boolean; url: string; error: string } = (await signIn("admin-login", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/admin/dashboard",
    })) as any;
    console.log(status);
    if (status.ok) {
      router.push(status.url);
    } else {
      toast.error(status.error, { id: status.error });
    }
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <SEO title="Admin Log In" />
      <Link href="/">
        <div className="flex justify-center items-center -space-x-3 shrink-0">
          <Image src="/amplifier.svg" alt="Amplifier" height="100" width="110" className="hover:cursor-pointer" />
          <div className={`${lobster.className} text-5xl -mt-5 hover:cursor-pointer`}>Amplifier</div>
        </div>
      </Link>
      <hr className="w-full -my-2" />
      <div className="w-full flex flex-col p-10 my-6 justify-center items-center">
        <div className="xl:w-[35%] md:w-[50%] flex flex-col">
          <h1 className="text-center mb-7 font-semibold">To continue as Admin, log in to Amplifier.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <h1 className="py-2">Email address</h1>
              <input
                type="text"
                placeholder="Email address"
                className={classNames(["rounded-md w-full p-4 text-black"], [errors.email && "border-[3px] border-red-500 focus:outline-red-600"])}
                {...register("email")}
              />
              {errors.email && <p className="text-white text-sm italic pt-1">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col my-4">
              <h1 className="py-2">Password</h1>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
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
            <div className="pt-4">
              <button
                className="rounded-full bg-green-500 hover:bg-transparent w-full p-4 text-lg text-neutral-800 font-extrabold hover:text-white border-2 border-black hover:border-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting || isValidating}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
