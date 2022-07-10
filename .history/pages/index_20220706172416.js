import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma.js";

export default function Home({ ratings }) {
  console.log(ratings);
  return (
    <div>
      <form>
        <label htmlFor="Name">Name</label>
        <input type="text" name="name" id="name" />
        <br />
        <label htmlFor="Category">Category</label>
        <br />
        <label htmlFor="show">Show</label>
        <input type="radio" name="category" id="show" value="Show" />
        <br />
        <label htmlFor="movie">Movie</label>
        <input type="radio" name="category" id="movie" value="Movie" />
        <br />
        <label htmlFor="game">Game</label>
        <input type="radio" name="category" id="game" value="Game" />
        <br />
        <label htmlFor="Name">Moist Meter or Liquid Ladder?</label>
        <br />
        <input type="checkbox" id="meter" name="meter" value="true" />
        <label htmlFor="Name">Rating</label>
        <input type="text" name="name" id="name" />
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
