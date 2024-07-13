import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import FeedCard from "@/components/FeedCard";
import { useCurretUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { CiImageOn } from "react-icons/ci";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import TwitterLayout from "@/components/Layout/x_Layout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import {
  getAllTweetsQuery,
  getSignedURLForTweetQuery,
} from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineGifBox } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GrLocation, GrClose } from "react-icons/gr";
import { FaEarthAmericas } from "react-icons/fa6";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
  
  const { user } = useCurretUser();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
  const { mutateAsync } = useCreateTweet();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [imageURL, setimageURL] = useState("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Complete", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setimageURL(myFilePath);
      }
    };
  }, []);

 const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setimageURL("");
  }, [content, mutateAsync, imageURL]);

  const handleRemoveImage = () => {
    setimageURL("");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return (
    <div className={`${inter.className} `}>
      <TwitterLayout>
        <div className="sticky top-0  z-10 backdrop-filter backdrop-blur-md">
          <div className="grid grid-cols-12 mt-4 ">
            <div className="relative  col-span-3 ml-4 mb-3">
              <h1 className="font-medium text-sm cursor-pointer">For you</h1>
              <div className="absolute top-8 left-[-3px] w-[65px] h-1 rounded-full bg-[#1d9bf0]"></div>
            </div>
            <h1 className="col-span-3 text-sm font-light cursor-pointer mr-10 whitespace-nowrap overflow-hidden overflow-ellipsis">
              Job Search & Recruiting
            </h1>
            <h1 className="col-span-3 text-sm font-light cursor-pointer">
              Entertainment
            </h1>
            <h1 className="col-span-3 text-sm text-right font-light cursor-pointer mr-4 mb-3">
              Following
            </h1>
          </div>
        </div>

        <div className="border border-r-0 border-l-0 border-b-0 border-gray-800 p-5 group hover:bg-[#070708] cursor-pointer transition-all">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {user?.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
            </div>
            <div className="col-span-11">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 ">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      id="dropdownDefaultButton"
                      onClick={toggleDropdown}
                      className="text-[#1d98ec]   bg-black hover:bg-slate-900 focus:outline-none font-semibold rounded-full text-sm px-3 py-1 text-center inline-flex items-center border border-slate-700"
                      type="button"
                    >
                      Everyone{" "}
                      <svg
                        className="w-2.5 h-2.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div
                        id="dropdown"
                        className="absolute z-10 bg-black divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
                      >
                        <ul
                          className="py-2 text-sm text-[#1d98ec]"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-white   hover:bg-transparent hover:text-[#1d98ec]"
                            >
                              Everyone
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-white hover:bg-transparent hover:text-[#1d98ec]"
                            >
                              My Communities
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-white hover:bg-transparent hover:text-[#1d98ec]"
                            >
                              Private
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-14 mb-4 w-full bg-transparent text-xl px-3 border-b border-slate-700 pb-6"
                  placeholder="What is happening?!"
                  rows={2}
                ></textarea>
                <div className="flex items-center absolute bottom-5 left-3 text-base text-[#1d98ec]">
                  <FaEarthAmericas className="mr-2 mb-4" />
                  <h1 className="text-sm mb-4 text-[#1d98ec] font-semibold cursor-pointer">
                    Everyone can reply
                  </h1>
                </div>
              </div>

              {imageURL && (
                <div className="relative inline-block ">
                  <img
                    src={imageURL}
                    alt="tweet-image"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  <GrClose
                    onClick={handleRemoveImage}
                    className="absolute top-1 mr-1 right-0 text-base font-bold cursor-pointer rounded-full text-white hover:opacity-60"
                    style={{
                      backgroundColor: "#0b0f13",
                      color: "#f8f8f8",
                      padding: "10px",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <h1
                    className="absolute top-1 ml-1 left-0 text-sm font-bold cursor-pointer rounded-full text-white"
                    style={{
                      backgroundColor: "#0b0f13",
                      padding: "10px",
                      width: "58px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Edit
                  </h1>
                </div>
              )}

              <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 ">
                  <div
                    className="text-gray-400  ml-3 relative"
                    onClick={handleSelectImage}
                    style={{ color: "#1d98ec" }}
                  >
                    <CiImageOn className="text-xl" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <CiImageOn className="text-blue-500 text-xl" />
                      </div>
                    </div>
                  </div>

                   

<div
                    className="text-gray-400  relative"
                    style={{ color: "#1d98ec" }}
                  >
                    <MdOutlineGifBox className="text-xl" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <MdOutlineGifBox className="text-blue-500 text-xl" />
                      </div>
                    </div>
                  </div>
                  
                
                  <div
                    className="text-gray-400  relative"
                    style={{ color: "#1d98ec" }}
                  >
                    <CiCircleList className="text-xl" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <CiCircleList className="text-blue-500 text-xl" />
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="text-gray-400  relative"
                    style={{ color: "#1d98ec" }}
                  >
                    <BsEmojiSmile className="text-lg" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <BsEmojiSmile className="text-blue-500 text-lg" />
                      </div>
                    </div>
                  </div>
                   
                  <div
                    className="text-gray-400  relative"
                    style={{ color: "#1d98ec" }}
                  >
                    <RiCalendarScheduleLine className="text-lg" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <RiCalendarScheduleLine className="text-blue-500 text-lg" />
                      </div>
                    </div>
                  </div>
                   
                  <div
                    className="text-gray-400  relative"
                    style={{ color: "#1d98ec" }}
                  >
                    <GrLocation className="text-lg" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-500 rounded-full p-2">
                        <GrLocation className="text-blue-500 text-lg" />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCreateTweet}
                  className="bg-[#1d9bf0] font-semibold text-sm py-2 px-5 rounded-full"
                >
                  Post
                </button>
              </div>
              
            </div>
          </div>
        </div>
        {tweets?.map((tweet: Tweet) =>
          tweet ? <FeedCard key={tweet.id} data={tweet} /> : null
        )}
      </TwitterLayout>
    </div>
    
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};