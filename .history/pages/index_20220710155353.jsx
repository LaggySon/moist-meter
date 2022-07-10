import styles from "../styles/Home.module.scss";

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";
import prisma from "../lib/prisma";

import Link from "next/link";

export default function Home({ initialRatings }) {
  const [ratings, setRatings] = useState(initialRatings);
  let count = initialRatings.length;
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
        setRatings([body, ...ratings]);
        e.target.reset();
        count++;
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
        <div className={styles.count}>Meters Created: {count}</div>
        <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label>
            Name:
            <input type="text" name="name" id="name" />
          </label>

          <label>
            Category:
            <input type="text" name="category" id="category" />
          </label>

          <label>
            Rating:
            <input type="number" name="rating" id="rating" />
          </label>

          <label>
            Link:
            <input type="text" name="link" id="link" />
          </label>

          <input type="submit" value="Add Rating" />
        </form>
      </div>
      <div className={styles.ratingBox}>
        <div className={styles.header + " " + styles.rating}>
          <div>name</div>
          <div>category</div>
          <div>rating</div>
          <div>link</div>
        </div>
        {ratings.map((rating) => (
          <div className={styles.rating} key={rating.id}>
            <div>
              <strong>{rating.name}</strong>
            </div>{" "}
            <div>{rating.category}</div> <div>{rating.rating}</div>
            <div>
              <Link href={rating.link}>Video Link</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//Get ratings from prisma (database)
export async function getServerSideProps() {
  const ratings = await prisma.rating.findMany({});

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  ratings.sort(compare);
  // console.log(ratings);
  return {
    props: {
      initialRatings: ratings,
    },
  };
}
