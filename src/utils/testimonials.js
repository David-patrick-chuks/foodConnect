import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const testimonialsDatabase = [
  {
    id: 1,
    name: "Adekunle Ope",
    role: "Receiver",
    image: "public/images/testA.jpg",
    quote: "Thanks to FoodConnect, I was able to access fresh produce when I needed it the most.",
  },
  {
    id: 2,
    name: "David Okafor",
    role: "Donor",
    image: "public/images/testD.jpg", quote: "FoodConnect makes it easy to share excess food with those in need, reducing waste and helping the community.",
  },
  {
    id: 3,
    name: "Mary Johnson",
    role: "Receiver",
    image: "public/images/testC.jpg",
    quote: "The platform has been a lifeline for my family. The fresh food donations have been incredibly helpful.",
  },
  {
    id: 4,
    name: "Opeyemi Muina",
    role: "Donor",
    image: "public/images/testD.jpg", quote: "I love how simple it is to donate food items through FoodConnect. It's a great way to give back.",
  },
  {
    id: 5,
    name: "Sarah Bambe",
    role: "Receiver",
    image: "public/images/testB.jpg", quote: "FoodConnect helped me find fresh ingredients that I couldn't afford otherwise. It's a wonderful initiative.",
  },
  {
    id: 6,
    name: "David Odogwu",
    role: "Donor",
    image: "public/images/testC.jpg",
    quote: "I've been able to help my community by donating food that would have gone to waste. FoodConnect makes it easy.",
  },
  {
    id: 7,
    name: "Peter Wale",
    role: "Receiver",
    image: "public/images/testA.jpg", quote: "As a student, it's been hard to afford fresh groceries. FoodConnect has been a blessing for me.",
  },
  {
    id: 8,
    name: "Chris Martinez",
    role: "Donor",
    image: "public/images/testD.jpg",
    quote: "It's rewarding to know that my excess food is going to people who need it. FoodConnect is a fantastic platform.",
  },
  {
    id: 9,
    name: "Jessica Okoye",
    role: "Receiver",
    image: "public/images/testC.jpg",
    quote: "The variety of fresh food available on FoodConnect has been amazing. It's really made a difference for my family.",
  },
];


export const sendTestimonialsToFirestore = async () => {
  try {
    for (let testimonial of testimonialsDatabase) {
      try {

        const docId = testimonial.name.replace(/\s+/g, '_');


        const imageRef = ref(storage, `Testimonials/${docId}.jpg`);
        const imageFile = await fetch(testimonial.image).then(res => res.blob());
        const snapshot = await uploadBytes(imageRef, imageFile);
        const downloadURL = await getDownloadURL(snapshot.ref);


        const docRef = doc(db, 'FcTestimonials', docId);

        await setDoc(docRef, {
          id: testimonial.id,
          name: testimonial.name,
          role: testimonial.role,
          image: downloadURL,
          quote: testimonial.quote,
        });

        console.log(`Successfully uploaded and added testimonial for ${testimonial.name}`);
      } catch (imageError) {
        console.error(`Error uploading image for testimonial ${testimonial.name}:`, imageError);
      }
    }
    console.log('All testimonials successfully added to Firestore with image URLs!');
  } catch (error) {
    console.error('Error adding testimonials to Firestore: ', error);
  }
};


