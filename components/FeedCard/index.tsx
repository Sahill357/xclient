import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegBookmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5  hover:bg-slate-950 cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/137982749?v=4"
            alt="user-image"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Sahil Sam</h5>
          <p>
            As a MERN full stack developer, I have experience in developing
            dynamic and scalable web applications using MongoDB, Express,
            ReactJS, and NodeJS.
          </p>
          <div className="flex justify-between mt-5  text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <GoHeart />
            </div>
            <div>
              <SiGoogleanalytics />
            </div>
            <div >
              <FaRegBookmark />
            </div>
            <div>
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
