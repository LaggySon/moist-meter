import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import { PrismaClient } from "@prisma/client";

function getServerSideProps(props) {
  const prisma = new PrismaClient();
}

export default function Home() {
  return <h1>Test</h1>;
}
