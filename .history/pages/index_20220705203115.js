import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma";

export default function Home({ Ratings }) {
  return (
    <div>
      <form onSubmit={submitRating}>
        <label htmlFor="Name">Name</label>
      </form>
      {Ratings.map((rating) => {
        <div>
          <h1>{rating.name}</h1>
        </div>;
      })}
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await prisma.Rating.findMany({});

  //convert decimal value to string to pass through as json
  const Ratings = data.map((rating) => ({
    ...rating,
    price: rating.rating.toString(),
  }));
  console.log(Ratings);
  return {
    props: { Ratings },
  };
}
