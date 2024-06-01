import React, { useCallback } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { Token } from "graphql";
import { useCurretUser } from "@/hooks/user";
import { useQueries, useQueryClient } from "@tanstack/react-query";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHome />,
  },
  {
    title: "Explore",
    icon: <FiSearch />,
  },
  {
    title: "Notifications",
    icon: <RiNotification2Line />,
  },
  {
    title: "Messages",
    icon: <LuMail />,
  },
  {
    title: "Grok",
    icon: <FaWandMagicSparkles />,
  },
  {
    title: "Bookmarks",
    icon: <FiBookmark />,
  },
  {
    title: "Communities",
    icon: <FaUserGroup />,
  },
  {
    title: "Premium",
    icon: <FaXTwitter />,
  },
  {
    title: "User",
    icon: <FaUser />,
  },
  {
    title: "More",
    icon: <CgMoreO />,
  },
];

export default function Home() {
  const { user } = useCurretUser();
  const queryClient = useQueryClient();
  console.log(user);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google Token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <div className={`${inter.className} overflow-hidden`}>
      <div className="grid grid-cols-12 h-screen w-screen ps-32  ">
        <div className="col-span-3 pt-1  ml-1 relative  ">
          <div className="text-3xl h-fit w-fit mb-1 hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <FaXTwitter />
          </div>
          <div className="mt-1 text-xl pr-4 ">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-1"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 px-3 mr-4">
              <button className="bg-[#1d9bf0] font-bold p-3 rounded-full w-full">
                Post
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 left-5  flex gap-2 items-center  hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user.profileImageURL} // Correct capitalization and closing tag
                  alt="user-image"
                  height={40}
                  width={40}
                />
              )}
              <div className="ml-2 flex mb-3 font-bold">
                <span className="text-xl">{user.firstName}</span>
                <span className="text-xl ml-1">{user.lastName}</span>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 overflow-y-scroll">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>

        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2">New to X ?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
