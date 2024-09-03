import { useNavigate } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
function Bot() {
const navigate =useNavigate()
      const handleRegister = () => {
        navigate("/signup");
      };

  const steps = [
    // {
    //   id: "e",
    //   message: "What is your name?",
    //   trigger: "x",
    // },
    // {
    //   id: "x",
    //   user: true,
    //   trigger: "b",
    // },
    // {
    //   id: "b",
    //   message: "Hi {previousValue}, nice to meet you!",
    //   // end: true,
    // },

    {
      id: "1",
      message: "Hello! Welcome to FoodConnect. How can I assist you today?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
          value: "donate",
          label: "I want to donate food",
          trigger: "donate-step",
        },
        {
          value: "claim",
          label: "I want to claim food",
          trigger: "claim-step",
        },
        {
          value: "how-it-works",
          label: "How does FoodConnect work?",
          trigger: "how-it-works-step",
        },
        { value: "about", label: "About FoodConnect", trigger: "about-step" },
        {
          value: "roles",
          label: "What do donors and receivers do?",
          trigger: "roles-step",
        },
        { value: "support", label: "Contact Support", trigger: "support-step" },
      ],
    },
    // Donate Flow
    {
      id: "donate-step",
      message:
        "Thank you for your generosity! Donating food is simple. Are you already registered?",
      trigger: "donate-registered",
    },
    {
      id: "donate-registered",
      options: [
        {
          value: "yes",
          label: "Yes, I'm registered",
          trigger: "donate-instructions",
        },
        {
          value: "no",
          label: "No, I need to register",
          trigger: "register-step",
        },
      ],
    },
    {
      id: "donate-instructions",
      message:
        "Great! You can post food items in your donor dashboard. Make sure to upload clear images and include details about the items you're donating.",
      trigger: "anything-else",
    },
    // Claim Flow
    {
      id: "claim-step",
      message:
        "FoodConnect allows you to claim fresh, uncooked food. Are you registered as a receiver?",
      trigger: "claim-registered",
    },
    {
      id: "claim-registered",
      options: [
        {
          value: "yes",
          label: "Yes, I'm registered",
          trigger: "claim-instructions",
        },
        {
          value: "no",
          label: "No, I need to register",
          trigger: "register-step",
        },
      ],
    },
    {
      id: "claim-instructions",
      message:
        "Awesome! You can browse available food items and claim what you need. Check the 'My Claims' section for updates.",
      trigger: "anything-else",
    },
    // Register Flow
    {
      id: "register-step",
      message: "Would you like to register as a donor or a receiver?",
      trigger: "register-options",
    },
    {
      id: "register-options",
      options: [
        { value: "donor", label: "Donor", trigger: "register-donor" },
        { value: "receiver", label: "Receiver", trigger: "register-receiver" },
      ],
    },
    {
      id: "register-donor",
      message:
        "You will be redirected to the registration page to sign up as a donor.",
      trigger: "redirect-register",
    },
    {
      id: "register-receiver",
      message:
        "You will be redirected to the registration page to sign up as a receiver.",
      trigger: "redirect-register",
    },
    {
      id: "redirect-register",
      message: "Redirecting you now...",
      trigger: () => handleRegister(),
    },
    // How it works
    {
      id: "how-it-works-step",
      message:
        "FoodConnect connects food donors with those in need of fresh, uncooked food. Donors post items, and receivers can claim them. Easy and impactful!",
      trigger: "anything-else",
    },
    // About FoodConnect
    {
      id: "about-step",
      message:
        "FoodConnect is a community-driven platform that aims to reduce food waste by connecting donors and receivers. We believe in the power of sharing to help the community.",
      trigger: "anything-else",
    },
    // Donor and Receiver Roles
    {
      id: "roles-step",
      message:
        "Donors can post uncooked food items to the platform, and receivers can browse and claim these items. Donors are helping the community, while receivers benefit from fresh, nutritious food.",
      trigger: "anything-else",
    },
    // Contact Support
    {
      id: "support-step",
      message:
        "For any issues or inquiries, you can reach out to us at support@foodconnect.com. We're here to help!",
      trigger: "anything-else",
    },
    // Catch-all "Anything else?" prompt
    {
      id: "anything-else",
      message: "Is there anything else I can help you with?",
      trigger: "options",
    },
  ];

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#ffbb00", // amber-600
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#ffbb07", // amber-600
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const style = {
      fontFamily: "Poppins",
    };
     const styleF = {
         fontFamily: "Poppins",
        //  background: "green"
     };
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        handleEnd={handleRegister}
        floating={true}
        floatingStyle={styleF}
        enableSmoothScroll={true}
        botDelay={1000}
        floatingIcon="/images/FoodBank.png"
        headerTitle="FoodConect Support"
        botAvatar="/images/FoodBank.png"
        userAvatar="/images/Avatar.png"
        steps={steps}
        style={style}
        recognitionEnable={true}
        speechSynthesis={{ enable: true, lang: "en" }}
      />
    </ThemeProvider>
  );
}
export default Bot;
