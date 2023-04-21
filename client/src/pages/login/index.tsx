import React, { useState } from 'react';
import Image from 'next/image';
import { Lobster } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useSession, signIn, signOut } from 'next-auth/react';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleGoogleSignIn = async () => {
    signIn('google',{callbackUrl:'https:localhost:3000'})
  }
  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex justify-center items-center -space-x-3'>
        <Image src='/amplifier.svg' alt='Amplifier' height='100' width='110' />
        <div className={`${lobster.className} text-5xl -mt-5`}>Amplifier</div>
      </div>
      <hr className='w-full -my-2' />
      <div className='w-full flex flex-col p-10 my-6 justify-center items-center'>
        <div className='w-1/3 flex flex-col'>
          <h1 className='text-center mb-5 font-semibold'>To continue, log in to Amplifier.</h1>
          <button
            className='flex justify-center items-center space-x-2 p-4 rounded-full border-green-500 border-2 hover:bg-neutral-900 font-medium'
            onClick={() => {
              handleGoogleSignIn();
            }}>
            <FcGoogle size={25} /> <span>Continue With Google</span>
          </button>
          <div className='flex my-5 justify-center items-center'>
            <hr className='w-full' />
            <span className='mx-6 font-bold'>OR</span>
            <hr className='w-full' />
          </div>
          <div>
            <div className='flex flex-col'>
              <h1 className='py-2'>Email address</h1>
              <input type='text' placeholder='Email address' className='rounded-md w-full p-4 text-black' />
            </div>
            <div className='flex flex-col my-4'>
              <h1 className='py-2'>Password</h1>
              <div className='relative'>
                <input type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' className='rounded-md w-full p-4 text-black pr-11' />
                <div
                  onClick={() => {
                    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
                  }}>
                  {isPasswordVisible ? (
                    <AiFillEye className='text-black absolute top-1 right-2 translate-y-1/2 hover:cursor-pointer' size={25} />
                  ) : (
                    <AiFillEyeInvisible className='text-black absolute top-1 right-2 translate-y-1/2 hover:cursor-pointer' size={25} />
                  )}
                </div>
              </div>
            </div>
            <div className='pt-4'>
              <button className='rounded-full bg-green-500 hover:bg-green-600 w-full p-4 text-lg text-neutral-800 font-extrabold hover:text-black'>Log In</button>
            </div>
          </div>
          <hr className='mt-7' />
          <h1 className='text-center mt-8 mb-4 font-semibold'>Don&apos;t have an account?</h1>
          <button className='flex justify-center items-center space-x-2 p-4 rounded-full border-green-500 border-2 hover:bg-neutral-900 font-medium'>Sign Up For Amplifier</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
