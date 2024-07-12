import React, { useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { FiMoreHorizontal, FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurretUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { IoIosMore } from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface TwitterWhatshappening {
  icon: React.ReactNode;
}

interface TwitterLayoutProps {
  children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurretUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <GoHome />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <FiSearch />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <RiNotification2Line />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <LuMail />,
        link: "/",
      },
      {
        title: "Grok",
        icon: <FaWandMagicSparkles />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <FiBookmark />,
        link: "/",
      },
      {
        title: "Communities",
        icon: <FaUserGroup />,
        link: "/",
      },
      {
        title: "Premium",
        icon: <FaXTwitter />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <FaUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/",
      },
    ],
    [user?.id]
  );

  const Whatshappening: TwitterWhatshappening[] = useMemo(
    () => [
      {
        icon: <IoIosMore />,
      },
    ],
    [user?.id]
  );

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google Token not found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  useEffect(() => {
    const middleSection = document.getElementById("middleSection");
    const rightSection = document.getElementById("rightSection");

    const syncScroll = () => {
      if (middleSection && rightSection) {
        rightSection.scrollTop = middleSection.scrollTop;
      }
    };

    if (middleSection) {
      middleSection.addEventListener("scroll", syncScroll);
    }

    return () => {
      if (middleSection) {
        middleSection.removeEventListener("scroll", syncScroll);
      }
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen ">
        <div
          className="col-span-3 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative"
          style={{ position: "sticky", top: 0 }}
        >
          <div>
            <div
              className="text-3xl h-fit w-fit  hover:bg-[#111314] rounded-full p-4 cursor-pointer transition-all"
              style={{ position: "sticky", top: 0 }}
            >
              <Link href="/">
                <FaXTwitter />
              </Link>
            </div>
            <div className=" text-xl pr-2">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    className="flex items-center gap-4  hover:bg-[#111314] rounded-full px-5 py-2 w-fit cursor-pointer mt-1"
                    key={item.title}
                  >
                    <Link href={item.link} className="flex items-center gap-4">
                      <span style={{ paddingRight: "5px" }}>
                        {React.cloneElement(item.icon as React.ReactElement, {
                          size: 24,
                        })}
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <button className="bg-[#1d9bf0] text-lg font-bold p-3 rounded-full w-full">
                  Post
                </button>
              </div>
            </div>
            {user && (
              <div className="mt-7 flex items-center hover:bg-[#111314] rounded-full p-3 cursor-pointer transition-all">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={40}
                    width={40}
                  />
                )}
                <div className="ml-3 flex flex-col">
                  <h3 className="text-lg font-bold">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
                <div className=" ">
                  <FiMoreHorizontal
                    style={{ marginLeft: "3rem" }}
                    className="text-xl  mt-5 -ml-2  "
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="col-span-5 ml-5 border-r-[1px] border-l-[1px] border-[rgb(41,45,47)]"
          style={{ overflowY: "auto", marginRight: "1.4rem" }}
          id="middleSection"
        >
          {props.children}
        </div>

        <div
          className="col-span-0 sm:col-span-3 p-4"
          style={{ overflowY: "auto" }}
          id="rightSection"
        >
          {!user ? (
            <div className="p-5 border-[rgb(41,45,47)] rounded-lg">
              <h1 className="my-2 text-2xl">New to X?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <>
              <div className="sam">
                <div
                  className="sticky-search rounded-full bg-[#202327] -ml-2 -mt-3"
                  style={{
                    position: "sticky",
                    top: "-11px",
                    zIndex: 1000,
                  }}
                >
                  <div className="flex items-center h-11 rounded-full">
                    <div className="grid place-items-center w-12 text-slate-500 pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      className="text-slate-100 text-sm bg-[#202327] pr-2 pl-2.5 rounded-full"
                      type="text"
                      id="search"
                      placeholder="Search"
                      style={{ caretColor: "#58595a", WebkitTextFillColor: "#58595a" }}
                    />
                  </div>
                </div>

                <div className="px-4 bg-black border border-[rgb(41,45,47)] rounded-2xl mt-4 -ml-2">
                  <h1 className="my-2 text-xl font-bold  ">
                    Subscribe to Premium
                  </h1>
                  <h1 className="text-sm font-light ">
                    Subscribe to unlock new features and if eligible, receive a
                    share of ads revenue.
                  </h1>
                  <Link
                    href={"/public\xa4342-P3QSQK-285.jpg"}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full block mt-2 mb-3 w-fit"
                  >
                    Subscribe
                  </Link>
                </div>
                
                <div className="px-4   mt-4 bg-black border border-[rgb(41,45,47)] rounded-2xl -ml-2">
                  <h1 className="my-2 text-xl mb-5 font-extrabold">
                    What’s happening
                  </h1>
                  <div className="flex items-center">
                    <img
                      src="https://media.istockphoto.com/id/1468202041/vector/cricket-player-isolated-low-polygonal-vector-illustration-cricketer-striking-batter.jpg?s=612x612&w=0&k=20&c=QmI2RVBCg3P3bo69FW1iSN8tE-HAdBOFMzmSAY6-S3E="
                      alt="Cricket Player"
                      className="image-responsive size-20 rounded-2xl"
                    />
                    <div className="">
                      <h1 className="text-sm font-extrabold ml-3">
                        South Africa vs Afghanistan
                      </h1>
                      <h1 className="text-xs font-extralight mt-2 ml-3">
                        Cricket · 1 hour ago
                      </h1>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <div>
                      <h1 className="text-xs font-extralight mt-2">
                        Technology · Trending
                      </h1>
                      <h1 className="text-sm font-extrabold">
                        Web Development
                      </h1>
                      <h1 className="text-sm font-extralight">2,528 posts</h1>
                    </div>
                    <div className="ml-auto">
                      <IoIosMore className="text-xl font-semibold" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <div>
                      <h1 className="text-xs font-extralight mt-2">
                        Entertainment · Trending
                      </h1>
                      <h1 className="text-sm font-extrabold">#Kalki2898AD</h1>
                      <h1 className="text-sm font-extralight">
                        Trending with #SalmanKhan,#AishwariaRai
                      </h1>
                    </div>
                    <div className="ml-auto">
                      <IoIosMore className="text-xl font-semibold" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <div>
                      <h1 className="text-xs font-extralight mt-2">
                        Trending in India
                      </h1>
                      <h1 className="text-sm font-extrabold">#JavaScript</h1>
                      <h1 className="text-sm font-extralight">2,373 posts</h1>
                    </div>
                    <div className="ml-auto">
                      <IoIosMore className="text-xl font-semibold" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <div>
                      <h1
                        className="text-sm font-semibold mt-2 mb-3 cursor-pointer"
                        style={{ color: "rgb(22, 120, 186)" }}
                      >
                        Show more
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="px-4   bg-black border border-[rgb(41,45,47)] rounded-2xl mt-4 -ml-2">
                  <h1 className="my-2 text-xl mb-1 font-extrabold">
                    Who to follow
                  </h1>
                  {user?.recommendedUsers?.map((el) => (
                    <div
                      className="flex items-center gap-3 mt-2"
                      key={el?.id}
                    >
                      <Link href={`/${el?.id}`}>
                        {el?.profileImageURL && (
                          <Image
                            src={el?.profileImageURL}
                            alt="user-image"
                            className="rounded-full mt-3 cursor-pointer"
                            width={45}
                            height={45}
                          />
                        )}
                      </Link>
                      <div className="flex items-center justify-between w-full">
                        <div className="text-sm font-extrabold cursor-pointer">
                          <Link href={`/${el?.id}`}>
                            {el?.firstName} {el?.lastName}
                          </Link>
                        </div>
                        <Link
                          href={`/${el?.id}`}
                          className="bg-white text-black font-bold text-sm px-5 py-1 mt-5 rounded-full "
                          style={{ lineHeight: "1.5rem" }} // Adjust line height as needed
                        >
                          Follow
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div>
                    <h1
                      className="text-sm font-semibold mt-7 mb-4 cursor-pointer"
                      style={{ color: "rgb(22, 120, 186)" }}
                    >
                      Show more
                    </h1>
                  </div>
                </div>
                <div>
                  <div>
                    <h1
                      className="text-xs font-thin mt-4 ml-5 cursor-pointer"
                      style={{ color: "#CED2D5" }}
                    >
                      <span className="mr-3">Terms of Service</span>
                      <span className="mr-3">Privacy Policy</span>
                      <span className="mr-3">Cookie Policy</span>
                      <span className="mr-3">Accessibility</span>
                      <span className="mr-3">Ads info</span>
                      <span className="mr-3">More</span>
                      <span className="mr-3">© 2024 X Corp.</span>
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Twitterlayout;
