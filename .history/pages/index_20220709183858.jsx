import styles from "../styles/Home.module.scss";

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";
import prisma from "../lib/prisma";

import Link from "next/link";

export default function Home({ initialRatings }) {
  const [ratings, setRatings] = useState(initialRatings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const category = e.target.elements.category.value;
    const rating = e.target.elements.rating.value;
    const link = e.target.elements.link.value;
    const body = { name, category, rating, link };

    // console.log(body);
    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        alert("Failed to add rating, please try again");
        //set an error banner here
      } else {
        console.log("Rating added successfully");
        setRatings([...ratings, body]);
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  return (
    <div>
      <div className={styles.inputForm}>
        <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label>
            Name:
            <input type="text" name="name" id="name" />
          </label>
          <br />
          <label>
            Category:
            <input type="text" name="category" id="category" />
          </label>
          <br />
          <label>
            Rating:
            <input type="number" name="rating" id="rating" />
          </label>
          <br />
          <label>
            Link:
            <input type="text" name="link" id="link" />
          </label>
          <br />
          <input type="submit" value="Add Rating" />
        </form>
      </div>
      <div className={styles.ratingBox}>
        {ratings.map((rating) => (
          <div className={styles.rating} key={rating.id}>
            {rating.name} <br /> {rating.category} <br /> {rating.rating} <br />
            <Link href={rating.link}>Video</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

//Get ratings from prisma (database)
export async function getServerSideProps() {
  const ratings = await prisma.rating.findMany({});
  // console.log(ratings);
  return {
    props: {
      initialRatings: ratings,
    },
  };
}
