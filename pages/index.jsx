import styles from "../styles/Home.module.scss";

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";
import prisma from "../lib/prisma";

import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ initialRatings }) {
  const [ratings, setRatings] = useState(initialRatings);
  const [sortType, setSortType] = useState("nameAsc");

  const { data: session } = useSession();

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

  function reOrder(orderMethod) {}

  return (
    <div>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
      {session && (
        <div>
          <button onClick={() => signOut()}>Sign Out</button>{" "}
          {session.user.name}
        </div>
      )}
      {session && session.user.role === "Admin" && (
        <div className={styles.inputForm}>
          <div className={styles.count}>Meters Created: {ratings.length}</div>
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
      )}

      <div className={styles.ratingBox}>
        <div className={styles.header + " " + styles.rating}>
          <div
            onClick={() => {
              if (sortType === "nameAsc") {
                setRatings(ratings.sort((a, b) => (a.name < b.name ? 1 : -1)));
                setSortType("nameDesc");
              } else {
                setRatings(ratings.sort((a, b) => (a.name > b.name ? 1 : -1)));
                setSortType("nameAsc");
              }
            }}
          >
            name
          </div>
          <div
            onClick={() => {
              if (sortType === "categoryAsc") {
                setRatings(ratings.sort((a, b) => (a.name < b.name ? 1 : -1)));
                setSortType("categoryDesc");
              } else {
                setRatings(ratings.sort((a, b) => (a.name > b.name ? 1 : -1)));
                setSortType("categoryAsc");
              }
            }}
          >
            category
          </div>
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
