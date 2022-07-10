import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma.js";

import { useState } from "react";

export default function Home({ ratings }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [meter, setMeter] = useState(false);
  const [rating, setRating] = useState("");
  console.log(ratings);
  return (
    <div>
      <form>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="radio"
          name="category"
          id="show"
          value="Show"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="show">Show</label>
        <br />
        <input
          type="radio"
          name="category"
          id="movie"
          value="Movie"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="movie">Movie</label>
        <br />
        <input
          type="radio"
          name="category"
          id="game"
          value="Game"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="game">Game</label>
        <br />
        <input type="checkbox" id="meter" name="meter" value="true" />
        <label htmlFor="meter">Moist Meter?</label>
        <br />
        <label htmlFor="Name">Rating</label>
        <input type="text" name="name" id="name" />
        <br />
        <input type="submit" value="submit" />
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
export async function getStaticProps(context) {
  const data = await prisma.rating.findMany({});

  //convert decimal value to string to pass through as json
  const ratings = data.map((rating) => ({
    ...rating,
    rating: rating.rating.toString(),
  }));
  // console.log(Ratings);
  return {
    props: { ratings },
  };
}
