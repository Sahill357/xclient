import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { RiFileListLine } from "react-icons/ri"; 
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface twitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: twitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHome />,
  },
  {
    title:"Explore",
    icon:<FiSearch />,
  },
 {
  title:'Notifications',
  icon:<RiNotification2Line />,
 },
 {
  title:'Messages',
  icon:<LuMail />,
 },
 {
  title:'Grok',
  icon:<FaWandMagicSparkles />,
 },
 {
  title:'Lists',
  icon:<RiFileListLine />,
 },
 {
  title:'Communities',
  icon:<FaUserGroup />,
 },
 {
  title:'Premium',
  icon:<FaXTwitter />,
 },
 {
  title:'User',
  icon:<FaUser />,
 },
 {
  title:'More',
  icon:<CgMoreO />,
 }
];

export default function Home() {
  return (
    <div className="inter.className">
      <div className="grid grid-cols-12 h-screen w-screen ps-56" >
        <div className="col-span-3 pt-1   ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <FaXTwitter />
          </div>
          <div className="mt-1 text-xl   pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-1" key={item.title}>
                  <span className="">{item.icon}</span>
                  <span>{item.title}</span>
                 
                </li>
              ))}
            </ul>
            <div className=" mt-5 px-3 mr-4 ">
            <button className="bg-[#1d9bf0] font-bold  p-4  rounded-full w-full">Post</button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px]   border border-gray-600" >
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3">

        </div>
      </div>
    </div>
  );
}
