import CardFour from "@/components/Cards/CardFour";
import CardOne from "@/components/Cards/CardOne";
import CardThree from "@/components/Cards/CardThree";
import CardTwo from "@/components/Cards/CardTwo";
import SEO from "@/components/SEO";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getSession } from "next-auth/react";

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

const Dashboard = () => {
  return (
    <div>
      <SEO title="Admin Dashboard" />
      {/* <Sidebar sidebarOpen={true} setSidebarOpen={() => {}} /> */}
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Dashboard;
