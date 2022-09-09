import { Typography, Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PianoKey } from "../src/components/PianoKey";
import { notes } from "../src/constant/notes";
import styles from "../src/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Box bgcolor={"red"}>
        {notes.map((note) => {
          return (
            <>
              <PianoKey note={note.note} color={note.color} />
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Home;
