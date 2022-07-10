import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import prisma from "../lib/prisma";

//Get ratings from prisma (database)
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

const submitRating = async (event) => {
  event.preventDefault();
  prisma.Rating.create({
    data: {
      name: event.target.name.value,
    },
  });
};

export default function Home({ Ratings }) {
  return (
    <div>
      <form onSubmit={submitRating}>
        <label htmlFor="Name">Name</label>
        <input type="text" name="name" id="name" />
      </form>
      {Ratings.map((rating) => {
        <div>
          <h1>{rating.name}</h1>
        </div>;
      })}
    </div>
  );
}
