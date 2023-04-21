import React from "react";
import Image from "next/image";
import { Lobster } from "next/font/google";
import { FcGoogle } from "react-icons/fc";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

const Login = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-center items-center -space-x-5 -my-6">
        <Image src="/amplifier.png" alt="Amplifier" height="120" width="120" />
        <div className={`${lobster.className} text-5xl`}>Amplifier</div>
      </div>
      <hr className="w-full my-6" />
      <div className="w-full flex flex-col p-10 justify-center items-center">
        <div className="w-1/3 flex flex-col">
          <h1 className="text-center mb-5 font-medium">To continue, login to Amplifier.</h1>
          <button className="flex justify-center items-center space-x-2 p-4 rounded-full border-green-500 border hover:bg-gray-950">
            <FcGoogle /> <span>Continue With Google</span>
          </button>
          <div className="flex my-5 justify-center items-center">
            <hr className="w-full" />
            <span className="mx-6">OR</span>
            <hr className="w-full" />
          </div>
          <div>
            <div className="flex flex-col">
              <h1 className="p-2">Email address or username</h1>
              <input type="text" placeholder="Email address or username" className="rounded-md w-full p-4"></input>
            </div>
            <div className="flex flex-col my-4">
              <h1 className="p-2">Password</h1>
              <input type="text" placeholder="Password" className="rounded-md w-full p-4"></input>
            </div>
            <div className="pt-4">
              <button className="rounded-full hover:bg-green-500 hover:border-green-200 bg-green-600 border border-green-900 w-full p-4 font-black text-lg text-black">Login</button>
            </div>
          </div> 
          <hr className="mt-10" />
          <h1 className="text-center mt-6 mb-4 font-medium">Don&apos;t have an account?</h1>
          <button className="flex justify-center items-center space-x-2 p-4 rounded-full border-green-500 border hover:bg-gray-950">
            Sign Up For Amplifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
