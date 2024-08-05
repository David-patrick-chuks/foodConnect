import { FaRegEdit, FaRocket, FaHandsHelping, FaHandHoldingHeart, FaUsers,FaUserPlus } from "react-icons/fa";

export const Steps = [
  {
    id: "register",
    icon: FaUserPlus,
    title: "Register",
    description: "Create an account as a donor or receiver to start using the platform.",
    cta: { text: "Get Started", href: "/register" },
  },
  {
    id: "post-or-browse",
    icon: FaRegEdit,
    title: "Post or Browse",
    description: "Donors can post available food items, while receivers browse the listings.",
    cta: { text: "Explore Now", href: "/browse" },
  },
  {
    id: "claim-or-donate",
    icon: FaHandHoldingHeart,
    title: "Claim or Donate",
    description: "Receivers claim items they need, and donors arrange for donation fulfillment.",
    cta: { text: "Donate Now", href: "/donate" },
  },
  {
    id: "connect-and-share",
    icon: FaUsers,
    title: "Connect & Share",
    description: "Engage with the community and share your experience to help others.",
    cta: { text: "Join Us", href: "/community" },
  },
];
