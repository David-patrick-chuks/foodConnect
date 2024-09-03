function About() {
  const missionItems = [
    {
      title: "Fighting Hunger",
      description:
        "We strive to ensure that nutritious, uncooked food reaches individuals and families who are struggling with food insecurity. Our platform facilitates the redistribution of surplus food to those who need it most, providing a vital resource in times of need.",
    },
    {
      title: "Reducing Food Waste",
      description:
        "By connecting donors with those in need, we help prevent perfectly good food from ending up in landfills, contributing to a more sustainable food system.",
    },
    {
      title: "Building Community",
      description:
        "We believe in the power of community to drive positive change. FoodConnect fosters a sense of connection and mutual support, enabling individuals and organizations to contribute to a common cause and strengthen local bonds.",
    },
  ];

  const values = [
    {
      title: "Compassion",
      description: "Fostering empathy and support for those in need.",
    },
    {
      title: "Sustainability",
      description:
        "Committed to reducing food waste and promoting environmental responsibility.",
    },
    {
      title: "Transparency",
      description:
        "Ensuring donors and receivers have clear visibility into food distribution.",
    },
    {
      title: "Dignity",
      description: "Ensuring access to food with respect and without stigma.",
    },
  ];

  const donorSteps = [
    "Create a Profile: Register on FoodConnect and set up your profile to start posting food items.",
    "Post Food Items: Share details about the fresh, uncooked food you wish to donate, including photos and descriptions.",
    "Manage Donations: Track your postings and see when items are claimed. Coordinate with receivers to arrange pickup.",
    "Track Impact: Use our dashboard to monitor the impact of your donations and see how your contributions are helping your community.",
  ];

  const receiverSteps = [
    "Set Up Your Profile: Sign up on FoodConnect to start browsing available food donations.",
    "Browse and Claim: Find and claim food items that meet your needs.",
    "Arrange Pickup: Follow the provided instructions to collect your claimed food items.",
    "Provide Feedback: Share your experience to help improve the platform and maintain a strong community.",
  ];

  return (
    <div>
      <header>about us</header>
    </div>
  );
}

export default About;
