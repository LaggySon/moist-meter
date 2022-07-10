import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import { PrismaClient } from "@prisma/client";
import prisma from "../../nextjs-starter/lib/prisma";

function getServerSideProps(props) {
  const prisma = new PrismaClient();
}

export default function Home() {
  return <></>;
}
