import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import { PrismaClient } from "@prisma/client";

function getServerSideProps(props) {
  const prisma = new PrismaClient();
}

export default function Home() {
  return (
    <>
      {prisma.Rating.findMany().map((rating) => {
        <>
          <h1>{rating.name}</h1>
          <h2>{rating.rating}</h2>
        </>;
      })}
    </>
  );
}
