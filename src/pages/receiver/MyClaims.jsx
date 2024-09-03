import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Badge,
} from "@material-tailwind/react";

import { db, auth } from "../../utils/firebase";

const MyClaims = () => {
  const [myClaims, setMyClaims] = useState([]);
  const [error, setError] = useState(null);

  const fetchMyClaims = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      const claimsQuerySnapshot = await getDocs(
        collection(db, "FoodConnectUsers", user.uid, "MyClaims")
      );

      const claimsArray = [];
      claimsQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firebase Timestamp to JavaScript Date
        const claimedAtDate = data.claimedAt.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          month: "short",
          day: "numeric",
        });
        claimsArray.push({ ...data, id: doc.id, claimedAt: claimedAtDate });
      });

      setMyClaims(claimsArray);
    } catch (error) {
      console.error("Error fetching claimed items:", error);
      setError("Failed to fetch claimed items.");
    }
  };

const handleUnclaim = async (claim) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    if (!claim.id || !claim.userId) {
      console.error("Claim missing postid or userId:", claim.id);
      setError("Invalid claim data. Missing postid or userId.");
      return;
    }

    // Remove from MyClaims
    const claimDocRef = doc(
      db,
      "FoodConnectUsers",
      user.uid,
      "MyClaims",
      claim.id
    );
    await deleteDoc(claimDocRef);

    const postDocRef = doc(
      db,
      "FoodConnectUsers",
      claim.userId,
      "MyPosts",
      claim.id
    );

    // Fetch the original post
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const claimedBy = postData.claimedBy || [];

      // Filter out the current user's claim
      const updatedClaimedBy = claimedBy.filter(
        (claimObj) => claimObj.userId !== user.uid
      );

      // Update the original post document with the new claimedBy array
      await updateDoc(postDocRef, { claimedBy: updatedClaimedBy });

      console.log("Claim removed from claimedBy array successfully.");
    } else {
      console.log("Post document does not exist.");
    }

    // Refetch claims after unclaiming
    fetchMyClaims();
  } catch (error) {
    console.error("Error unclaiming item:", error);
    setError("Failed to unclaim item.");
  }
};

  useEffect(() => {
    fetchMyClaims();
  }, []);

  const TABLE_HEAD = [
    "Item Name",
    "Description",
    "State",
    "Status",
    "Claimed At",
    "Actions",
  ];

  return (
    <>
      <Card className="h-full w-full" shadow={true}>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Recent Claims
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last Claim Items
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {myClaims.length > 0 ? (
              <tbody>
                {myClaims.map((claim, index) => {
                  const isLast = index === myClaims.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      className="even:bg-blue-gray-50/50"
                      key={claim.itemName}
                    >
                      <td className="flex classes items-center gap-3">
                        <Badge
                          content={
                            <Avatar
                              src={claim.donor.avatarUrl}
                              alt={claim.donor.fullName}
                              size="xs"
                              className=" object-cover rounded-full w-4 h-4"
                            />
                          }
                          // color="yellow"
                          className="bg-amber-600"
                          overlap="circular"
                          withBorder
                          placement="bottom-end"
                        >
                          <Avatar
                            src={claim.imageUrls[0]}
                            alt={claim.itemName}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                        </Badge>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {claim.itemName.length < 1 ? (
                            <h1>...</h1>
                          ) : (
                            <span>{`${claim.itemName.slice(0, 15)}...`}</span>
                          )}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {claim.description.length < 1 ? (
                            <h1>...</h1>
                          ) : (
                            <span>{`${claim.description.slice(
                              0,
                              15
                            )}...`}</span>
                          )}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {claim.state}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={claim.status}
                            color={
                              claim.status === "success"
                                ? "green"
                                : claim.status === "pending"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {claim.claimedAt.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Unclaim">
                          <IconButton
                            disabled={
                              claim.status === "rejected" ||
                              claim.status === "success"
                            }
                            onClick={() => handleUnclaim(claim)}
                            variant="text"
                          >
                            <ArchiveBoxXMarkIcon
                              color={
                                claim.status === "success"
                                  ? "black"
                                  : claim.status === "pending"
                                  ? "black"
                                  : "red"
                              }
                              className="h-4 w-4"
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <p>YOU DONT HAVE ANY CLAIM</p>
            )}
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default MyClaims;
