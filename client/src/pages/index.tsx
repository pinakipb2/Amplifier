import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/UserLayout";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <UserLayout>
      <SEO />
      hi
    </UserLayout>
  );
}
