import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma.js";

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";

import useSWR from "swr";

export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Show");
  const [rating, setRating] = useState(85);

  const { ratings, error } = useSWR("getRatings", fetcher);
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
      <div className={styles.inputForm}>
        <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category: </label>
          <input
            type="text"
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="category">Rating: </label>
          <input
            type="number"
            name="rating"
            id="rating"
            onChange={(e) => setRating(e.target.value)}
          />
          <br />
          <input type="submit" value="Add Rating" />
        </form>
      </div>
      <div className={styles.ratingBox}>
        {error && <div>Failed to load</div>}
        {!ratings && <div>Loading...</div>}
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
const fetcher = async () => {
  const ratings = prisma.rating.findMany({});
  return ratings;
};
