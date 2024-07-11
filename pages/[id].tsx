import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout/x_Layout";
import { Tweet, User } from "@/gql/graphql";
import { Tweet as TweetType } from "@/gql/graphql";
import { GetServerSideProps, NextPage } from "next";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { graphqlClient } from "@/clients/api";
import { LiaBriefcaseSolid } from "react-icons/lia";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurretUser } from "@/hooks/user";
import {
  followUserMutation,
  unFollowUserMutation,
} from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
import { FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";
import { RiLink } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();
  const { user: currentUser } = useCurretUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (currentUser?.following?.findIndex(
        (el: { id: string | undefined }) => el?.id === props.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, props.userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(followUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props.userInfo?.id, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(unFollowUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props.userInfo?.id, queryClient]);

  return (
    <div className="mr-3">
      <TwitterLayout >
        <div>
          <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-md flex items-center gap-3 py-2 px-5 border-b border-[rgb(41,45,47)]">
           
           
            
            <Link href="/">

            <div
                    className="text-gray-400  relative"
                    style={{ color: "#ffffff" }}
                  >
                    <FaArrowLeft className="text-lg" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-100 opacity-0 hover:opacity-10 transition-opacity duration-300">
                      <div className="bg-blue-100 rounded-full p-2">
                        <FaArrowLeft className="text-blue-100 text-lg" />
                      </div>
                    </div>
                  </div>
                  </Link>


            <div className="mt-[-14px]">
              <h1 className="text-xl  font-bold ml-7 mt-2">
                {props.userInfo?.firstName} {props.userInfo?.lastName}
              </h1>
              <h1 className="text-xs -mb-1 font-medium text-slate-600 ml-7">
                {props.userInfo?.tweets?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className="relative p-4 border-b border-[rgb(41,45,47)]">
            <div
              className="absolute top-0 left-0 w-full h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url('/ltqoef.jpg')`,
                zIndex: -1,
              }}
            ></div>

{props.userInfo?.profileImageURL && (
  <a href={props.userInfo.profileImageURL} target="_blank" rel="noopener noreferrer">
    <img
      src={props.userInfo.profileImageURL}
      alt="user-image"
      className="rounded-full relative z-10 mt-24 cursor-pointer"
      width={130}
      height={130}
    />
  </a>
)}


            {currentUser?.id !== props.userInfo?.id && (
              <div className="absolute right-4 transform translate-y-[-40px] flex items-center">
                <div className="flex items-center cursor-pointer">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full border-2  opacity-70"
                    style={{ borderColor: "rgba(255, 255, 255, 0.6)" }}
                  >
                    <LuMail className="text-xl" />
                  </div>
                  <div className="ml-2 opacity-70">
                    <CiCircleMore className="text-4xl cursor-pointer" />
                  </div>
                </div>
                <div className="ml-2">
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollowUser}
                      className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
                      style={{ minWidth: "80px" }} // Adjust width as needed
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
                      style={{ minWidth: "80px" }} // Adjust width as needed
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            )}

            <h1 className="text-xl font-bold mt-4">
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>
            <div className="flex justify-between items-center mt-3">
              <div className="flex flex-col gap-2 text-sm">
                <h1 className="font-sans">Software Engineer, Designer</h1>
                
                <h1 className="flex items-center mt-1 font-thin">
                <LiaBriefcaseSolid  className="mr-1 text-base"/>
                Engineer
                <GrLocation className="mr-1 ml-2 text-base" />
                california
                  <RiLink className="mr-1 ml-2 text-base" />
                  <a
                    href="https://github.com/Sahill357"
                    className="mr-3 text-blue-500 font-normal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     github.com 
                  </a>
                  <FaRegCalendarAlt className="mr-1 " />
                  Joined June 2016
                </h1>
                
                <div className="flex gap-4 mt-1 font-extralight">
                  <span>{props.userInfo?.following?.length} following</span>
                  <span>{props.userInfo?.followers?.length} followers</span>
                </div>
                <h1 className="text-xs mt-1 font-extralight">
                  Not followed by anyone you’re following
                </h1>
              </div>
            </div>
          <div className="ml-5 grid grid-cols-12 gap-3 mt-7 cursor-pointer ">
              <div className="relative col-span-2  ">
                <h1 className="font-bold">Posts</h1>
                <div className="absolute top-9 left-[-3px] w-[65px] h-1 rounded-full bg-[#1d9bf0]"></div>
              </div>
              <h1 className="col-span-2  ml-5 font-light opacity-50 whitespace-nowrap overflow-hidden overflow-ellipsis">
                Replies
              </h1>
              <h1 className="col-span-2 mr-5 text-right font-light opacity-50  ">Subs</h1>
              <h1 className="col-span-2 mr-5 text-right font-light opacity-50  ">Highlight</h1>
              <h1 className="col-span-2 mr-5 text-right font-light opacity-50  ">Articles</h1>
              <h1 className="col-span-2 text-right font-light opacity-50 mr-5">Media</h1>
            </div>
          </div>
          
          <div>
            {props.userInfo?.tweets
              ?.filter((tweet): tweet is TweetType => tweet != null)
              .map((tweet: TweetType) => (
                <FeedCard data={tweet} key={tweet.id} />
              ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;

  if (!id) return { notFound: true, props: { userInfo: undefined } };

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
};

export default UserProfilePage;
