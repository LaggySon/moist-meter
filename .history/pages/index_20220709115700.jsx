import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma.js";

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";

export default function Home({ ratings }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Show");
  const [rating, setRating] = useState(85);
  console.log(ratings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, category, rating };
    console.log(body);
    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setRating(0);
  };

  return (
    <div>
      <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" />
      </form>
      <div className={styles.ratingBox}>
        {ratings.map((rating) => (
          <div className={styles.rating} key={rating.id}>
            {rating.name} <br /> {rating.category} <br /> {rating.rating}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

//Get ratings from prisma (database)
export const getStaticProps = async () => {
  const data = await prisma.rating.findMany({});

  //convert decimal value to string to pass through as json
  const ratings = data.map((rating) => ({
    ...rating,
    rating: rating.rating.toString(),
  }));
  // console.log(ratings);
  return {
    props: { ratings },
    revalidate: 10,
  };
};
