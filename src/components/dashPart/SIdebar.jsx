import { Typography } from "@material-tailwind/react";
import React from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
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
      { id: 1, path: "/dashboard/donor", label: "Home" },
      { id: 2, path: "/dashboard/post-item", label: "Post Item" },
      { id: 3, path: "/dashboard/manage-posts", label: "Manage Post" },
      { id: 4, path: "/dashboard/donor-messages", label: "Messages" },
      { id: 5, path: "/dashboard/donor-notifications", label: "Notifications" },
      { id: 6, path: "/dashboard/donor-profile", label: "Profile" },
      { id: 7, label: "Log out" },
    ],
    receiver: [
      { id: 1, path: "/dashboard/receiver", label: "Home" },
      { id: 2, path: "/dashboard/claim-food", label: "Claim Food" },
      { id: 3, path: "/dashboard/my-claims", label: "My Claims" },
      { id: 4, path: "/dashboard/receiver-messages", label: "Messages" },
      {
        id: 5,
        path: "/dashboard/receiver-notifications",
        label: "Notifications",
      },
      { id: 6, path: "/dashboard/receiver-profile", label: "Profile" },
      { id: 7, label: "Log out" },
    ],
  };

  return (
    <>
      <div
        onClick={handlecloseNav}
        className={`fixed  ${
          sidebarNav ? "flex" : "hidden md:hidden"
        } z-50 inset-0 bg-gray-800 opacity-50`}
      ></div>
      <aside
        className={`md:w-[20%] w-1/2 ${
          sidebarNav ? "flex" : "hidden md:flex"
        }  h-screen bg-white shadow-lg md:shadow-md md:relative top-0 z-50 absolute p-4`}
      >
        {loading ? (
          <div className="flex gap-4 items-center p-3  animate-pulse flex-col justify-between ">
            <Typography
              as="div"
              variant="h1"
              className=" h-9 bg-gray-200 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className=" h-5 bg-gray-100 rounded-lg px-2 py-2 w-full"
            >
              &nbsp;
            </Typography>
          </div>
        ) : (
          <>
            {sidebarNav ? (
              <>
                {" "}
                <nav className="flex z-50  flex-col py-5 gap-[6%] h-full ">
                  <div className="flex shadow-sm justify-center items-center text-2xl font-bold ">
                    Food{" "}
                    <span className="text-amber-500 inline-flex items-center">
                      Connect
                    </span>
                  </div>
                  <ul>
                    {navLinks[userType]?.map((link) =>
                      link.label === "Log out" ? (
                        <li key={link.id} className="dashNav">
                          <button
                            onClick={handleSignOut}
                            className="flex gap-4 inactive-link items-center text-black"
                          >
                            {link.label}
                          </button>
                        </li>
                      ) : (
                        <li key={link.id} onClick={handlecloseNav} className="dashNav">
                          <NavLink
                            className={({ isActive }) =>
                              isActive
                                ? "active-link flex gap-4 items-center bg-amber-600"
                                : "inactive-link flex gap-4 items-center text-black"
                            }
                            to={link.path}
                          >
                            {link.label}
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </>
            ) : (
              <nav className="flex flex-col py-5 gap-[6%] h-full ">
                <div className="flex shadow-sm justify-center items-center text-2xl font-bold ">
                  Food{" "}
                  <span className="text-amber-500 inline-flex items-center">
                    Connect
                  </span>
                </div>
                <ul>
                  {navLinks[userType]?.map((link) =>
                    link.label === "Log out" ? (
                      <li key={link.id} className="dashNav">
                        <button
                          onClick={handleSignOut}
                          className="flex gap-4 inactive-link items-center text-black"
                        >
                          {link.label}
                        </button>
                      </li>
                    ) : (
                      <li key={link.id} className="dashNav">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "active-link flex gap-4 items-center bg-amber-600"
                              : "inactive-link flex gap-4 items-center text-black"
                          }
                          to={link.path}
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            )}
          </>
        )}
      </aside>
    </>
  );
}
