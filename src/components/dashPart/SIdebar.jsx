import {
  ArrowLeftStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  BellAlertIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  InboxArrowDownIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  CogIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIconSolid,
  BellAlertIcon as BellAlertIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  DocumentDuplicateIcon as DocumentDuplicateIconSolid,
  DocumentPlusIcon as DocumentPlusIconSolid,
  InboxArrowDownIcon as InboxArrowDownIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  Square3Stack3DIcon as Square3Stack3DIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid,
  CogIcon as CogIconSolid,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Badge, Chip, Tooltip, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  userType,
  handleSignOut,
  loading,
  sidebarNav,
  handlecloseNav,
}) {
  const navLinks = {
    donor: [
      {
        id: 1,
        path: "/dashboard/donor",
        label: "Home",
        icon: Square3Stack3DIcon,
        iconSolid: Square3Stack3DIconSolid,
      },
      {
        id: 2,
        path: "/dashboard/post-item",
        label: "Post Item",
        icon: DocumentPlusIcon,
        iconSolid: DocumentPlusIconSolid,
      },
      {
        id: 3,
        path: "/dashboard/manage-posts",
        label: "Manage Post",
        icon: DocumentDuplicateIcon,
        iconSolid: DocumentDuplicateIconSolid,
      },
      {
        id: 4,
        path: "/dashboard/donor-messages",
        label: "Messages",
        icon: ChatBubbleLeftEllipsisIcon,
        iconSolid: ChatBubbleLeftEllipsisIconSolid,
      },
      {
        id: 5,
        path: "/dashboard/donor-notifications",
        label: "Notifications",
        icon: BellAlertIcon,
        iconSolid: BellAlertIconSolid,
      },
      {
        id: 6,
        path: "/dashboard/donor-profile",
        label: "Profile",
        icon: UserCircleIcon,
        iconSolid: UserCircleIconSolid,
      },
      {
        id: 7,
        path: "/dashboard/settings",
        label: "Settings",
        icon: CogIcon,
        iconSolid: CogIconSolid,
      },
      {
        id: 8,
        label: "Log out",
        iconSolid: ArrowLeftStartOnRectangleIconSolid,
        icon: ArrowLeftStartOnRectangleIcon,
      },
    ],

    receiver: [
      {
        id: 1,
        path: "/dashboard/receiver",
        label: "Home",
        icon: Square3Stack3DIcon,
        iconSolid: Square3Stack3DIconSolid,
      },
      {
        id: 2,
        path: "/dashboard/claim-food",
        label: "Claim Food",
        icon: InboxArrowDownIcon,
        iconSolid: InboxArrowDownIconSolid,
      },
      {
        id: 3,
        path: "/dashboard/my-claims",
        label: "My Claims",
        icon: ShoppingBagIcon,
        iconSolid: ShoppingBagIconSolid,
      },
      {
        id: 4,
        path: "/dashboard/receiver-messages",
        label: "Messages",
        icon: ChatBubbleLeftEllipsisIcon,
        iconSolid: ChatBubbleLeftEllipsisIconSolid,
      },
      {
        id: 5,
        path: "/dashboard/receiver-notifications",
        label: "Notifications",
        icon: BellAlertIcon,
        iconSolid: BellAlertIconSolid,
      },
      {
        id: 6,
        path: "/dashboard/receiver-profile",
        label: "Profile",
        icon: UserCircleIcon,
        iconSolid: UserCircleIconSolid,
      },
      {
        id: 7,
        path: "/dashboard/settings",
        label: "Settings",
        icon: CogIcon,
        iconSolid: CogIconSolid,
      },
      {
        id: 8,
        label: "Log out",
        icon: ArrowLeftStartOnRectangleIcon,
        iconSolid: ArrowLeftStartOnRectangleIconSolid,
      },
    ],
  };
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const handleTheme = () => {
    setDark(!dark);
  };
  const MobileScreen = window.innerWidth < 400
  // console.log(MobileScreen)
  return (
    <>
      <div
        onClick={handlecloseNav}
        className={`fixed  ${
          sidebarNav ? "flex md:hidden" : "hidden "
        } z-30 inset-0  bg-gray-800 opacity-50`}
      ></div>
      <aside
        className={`md:max-w-[30%] h-screen ${
          sidebarNav ? "md:w-[20%] h-screen" : "w-fit h-screen"
        } z-50 max-w-1/2 flex items-center  shadow flex-col dark:bg-amber-600 bg-white py-4`}
      >
        {loading ? (
          <div
            className={`flex gap-4 items-center p-3  animate-pulse flex-col justify-between `}
          >
            loading Sidebar
          </div>
        ) : (
          <nav className="flex flex-col w-full items-center py-5 justify-normal gap-5 h-full ">
            <img
              src="/images/FoodBank.png"
              className={` ${sidebarNav ? "hidden " : "flex w-10"}`}
            />
            <div
              className={` ${
                sidebarNav ? "flex" : "hidden"
              }  justify-center items-center text-2xl font-bold `}
            >
              Food{" "}
              <span className="text-white inline-flex items-center">
                Connect
              </span>
            </div>
            <ul
              onClick={MobileScreen && handlecloseNav}
              className={`flex flex-col w-full px-4 gap-1 ${
                sidebarNav ? "items-start" : "items-center"
              } `}
            >
              {navLinks[userType].map((link) =>
                link.label === "Log out" ? (
                  <li key={link.id}>
                    <button
                      onClick={handleSignOut}
                      className="flex gap-4 inactive-link items-center text-white"
                    >
                      {sidebarNav ? (
                        <>
                          <link.icon className=" text-black w-5 h-5" />{" "}
                          <span>{link.label}</span>
                        </>
                      ) : (
                        <Tooltip
                          className="px-2 ml-4 rounded-md py-0 shadow shadow-black/10"
                          content={link.label}
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                          placement="right-end"
                        >
                          <link.iconSolid className=" text-black w-[22px] h-[22px]" />
                        </Tooltip>
                      )}
                    </button>
                  </li>
                ) : (
                  <li key={link.id} className="w-full">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "active-link flex gap-4 dark:bg-white/90 dark:text-amber-600 items-center bg bg-amber-600"
                          : "inactive-link dark:text-white/70 flex gap-4 items-center text-dark"
                      }
                      to={link.path}
                    >
                      {sidebarNav ? (
                        <>
                          <link.icon className=" w-5 h-5" />{" "}
                          <span>{link.label}</span>
                        </>
                      ) : (
                        <div className="relative">
                          <Tooltip
                            className="px-2 ml-4 rounded-md py-0 shadow shadow-black/10"
                            content={link.label}
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            placement="right-end"
                          >
                            <link.iconSolid className=" w-7 h-7" />
                          </Tooltip>
                          <span
                            className={`absolute ${
                              link.label === "Messages" && userType === userType
                                ? "bg-red-500"
                                : link.label === "My Claims" &&
                                  userType === userType
                                ? "bg-red-500"
                                : link.label === "Notifications" &&
                                  userType === userType
                                ? "bg-red-500"
                                : "bg-transparent"
                            } -top-1 -right-2 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white rounded-full`}
                          >
                            {link.label === "Messages" && userType === userType
                              ? "5"
                              : link.label === "My Claims" &&
                                userType === userType
                              ? "6"
                              : link.label === "Notifications" &&
                                userType === userType
                              ? "7"
                              : null}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
        <span onClick={handleTheme}>
          {dark && (
            <SunIcon
              className={`${dark &&
                "w-8 rotate-180 duration-[2000ms] text-amber-600 p-1 bg-white shadow rounded-full"}`}
            />
          )}
          {!dark && (
            <MoonIcon className="border border-1 border-gray-300 w-8 text-amber-600 p-1 bg-white shadow rounded-full" />
          )}
        </span>
        <div className={` ${sidebarNav ? "w-full flex justify-end px-3" : null}`}>
          <ChevronRightIcon
            onClick={handlecloseNav}
            className={`${
              sidebarNav
                ? " rotate-180 duration-[2000ms]"
                : " rotate-0 duration-[2000ms]"
            }border border-1 border-gray-300 w-8 text-black p-1 bg-white/90 shadow rounded-full`}
          />
        </div>
        {/* <ChevronLeftIcon className="border border-1 border-gray-300 w-8 text-amber-600 p-1 bg-white shadow rounded-full" /> */}
      </aside>
    </>
  );
}
