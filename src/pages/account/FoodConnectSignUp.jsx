import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Checkbox,
} from "@material-tailwind/react";
import { IoIosPeople } from "react-icons/io";
import { ImUser } from "react-icons/im";

export default function FoodConnectSignUp() {
  const [userType, setUserType] = useState("donor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <Card className="w-full ">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {userType === "donor" ? (
            <ImUser className="h-10 w-10 text-white" />
          ) : (
            <IoIosPeople className="h-10 w-10 text-white" />
          )}
        </div>
        <Typography variant="h5" color="white">
          {userType === "donor"
            ? "Make a difference—sign up as a donor and contribute fresh, uncooked food to those in need."
            : "Looking for support? Sign up as a receiver to access fresh, uncooked food items."}
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={userType} className="overflow-visible">
          <TabsHeader className="relative z-0">
            <Tab value="donor" onClick={() => setUserType("donor")}>
              Sign Up as Donor
            </Tab>
            <Tab value="receiver" onClick={() => setUserType("receiver")}>
              Sign Up as Receiver
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: userType === "donor" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: userType === "donor" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="donor" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Full Name
                  </Typography>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Organization Name (if applicable)
                  </Typography>
                  <Input
                    type="text"
                    placeholder="Organization Name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Email Address
                  </Typography>
                  <Input
                    type="email"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Password
                  </Typography>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
              
                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-700">
                    I agree to the Terms and Conditions
                  </label>
                </div>
                <Button size="lg" disabled={!termsAccepted}>
                  Sign Up as Donor
                </Button>
              </form>
            </TabPanel>
            <TabPanel value="receiver" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Full Name
                  </Typography>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Email Address
                  </Typography>
                  <Input
                    type="email"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Password
                  </Typography>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
             
                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-700">
                    I agree to the Terms and Conditions
                  </label>
                </div>
                <Button size="lg" disabled={!termsAccepted}>
                  Sign Up as Receiver
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
