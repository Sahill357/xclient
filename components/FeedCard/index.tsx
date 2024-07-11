import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegBookmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import { MdOutlineGraphicEq } from "react-icons/md";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-[rgb(41,45,47)] p-5 -mb-2  hover:bg-[#070708] cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author?.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11 ">
          <h5>
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName}
              {data.author?.lastName}
            </Link>
          </h5>
          <p className="mb-2 font-extralight text-sm">{data.content}</p>
          {data.imageURL && (
            <Image
              className="rounded-2xl"
              src={data.imageURL}
              alt="image"
              width={500}
              height={500}
            />
          )}
          <div className="flex justify-between mt-3 text-lg items-center">
            <div className="relative group">
              <BiMessageRounded className="text-gray-400 group-hover:text-blue-700 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 group-hover:opacity-45 transition-opacity duration-300">
                <div className="bg-blue-500 rounded-full p-2">
                  <BiMessageRounded className="text-blue-500 text-lg opacity-0" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <FaRetweet className="text-gray-400 group-hover:text-green-700 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-500 opacity-0 group-hover:opacity-25 transition-opacity duration-300">
                <div className="bg-green-500 rounded-full p-2">
                  <FaRetweet className="text-green-500 text-lg opacity-0" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <GoHeart className="text-gray-400 group-hover:text-pink-700 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-pink-500 opacity-0 group-hover:opacity-25 transition-opacity duration-300">
                <div className="bg-pink-500 rounded-full p-2 ">
                  <GoHeart className="text-pink-700 text-lg opacity-0" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <MdOutlineGraphicEq className="text-gray-400 group-hover:text-blue-700 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 group-hover:opacity-25 transition-opacity duration-300">
                <div className="bg-blue-500 rounded-full p-1.5">
                  <MdOutlineGraphicEq className="text-blue-700 text-2xl opacity-0" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
  <div className="relative group">
    <FaRegBookmark className="text-gray-400 group-hover:text-blue-700 transition-colors duration-300 text-base" />
    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 group-hover:opacity-45 transition-opacity duration-300">
      <div className="bg-blue-500 rounded-full p-2">
        <FaRegBookmark className="text-blue-500 text-lg opacity-0" />
      </div>
    </div>
  </div>

  <div className="relative group">
    <FiUpload className="text-gray-400 group-hover:text-blue-700 transition-colors duration-300 text-base" />
    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 group-hover:opacity-45 transition-opacity duration-300">
      <div className="bg-blue-500 rounded-full p-2">
        <FiUpload className="text-blue-500 text-lg opacity-0" />
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
