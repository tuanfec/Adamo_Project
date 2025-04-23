import { HomeLayout } from "@/layouts/HomeLayout";
import { EmailSubcription } from "@/components/home/EmailSubcription";
import { Content } from "@/components/home/Content";
import { ListTour } from "@/components/home/ListTour";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
export const HomePage: React.FC = () => {
  const data = [
    {
      image: img3,
      title: "Title 1",
      experiences: 1,
    },
    {
      image: img4,
      title: "Title 1",
      experiences: 1,
    },
    {
      image: img3,
      title: "Title 1",
      experiences: 2,
    },
    {
      image: img3,
      title: "Title 1",
      experiences: 2,
    },
    {
      image: img3,
      title: "Title 1",
      experiences: 2,
    },
  ];

  const data1 = [
    {
      image: img3,
      title: "Title 1",
      votes: 4.5,
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img4,
      title: "Title 1",
      votes: 4.5,
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img3,
      title: "Title 1",
      votes: 4.5,
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 1000,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 400,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 1200,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 500,
      duration: "8 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "2 days",
      type: "Adventure",
    },
    {
      image: img3,
      title: "Title 1",
      votes: 4.5,
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 1000,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 400,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 1200,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 500,
      duration: "8 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "2 days",
      type: "Adventure",
    },
    {
      image: img3,
      title: "Title 1",
      votes: 4.5,
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 1000,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 400,
      duration: "10 days",
      type: "Walking",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 100,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 1200,
      duration: "10 days",
      type: "Adventure",
    },
    {
      image: img5,
      title: "Title 1",
      votes: 4.5,
      isSave: false,
      location: "Location 1",
      price: 500,
      duration: "8 days",
      type: "Adventure",
    },
    {
      image: "https://source.unsplash.com/random/400x300",
      title: "Title 1",
      isSave: true,
      location: "Location 1",
      price: 100,
      duration: "2 days",
      type: "Adventure",
    },
  ];

  return (
    <HomeLayout>
      <div className="py-8 ">
        <Content />
        <ListTour
          data={data}
          header="Discover fascinating destinations"
          slidesPerView={4}
          spaceBetween={40}
        />
        <ListTour
          data={data1}
          header="Attractive tour and interesting experiences"
          slidesPerView={3}
          spaceBetween={40}
        />
        <ListTour
          data={data1}
          header="Experience the traditional cultural beauties of Vietnam"
          slidesPerView={3}
          spaceBetween={40}
        />
        <EmailSubcription />
      </div>
    </HomeLayout>
  );
};
