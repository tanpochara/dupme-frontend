import { Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Score } from "../src/@types/score";
import { ScoreBox } from "../src/components/ScoreBox";
import { SocketContext } from "../src/context/SocketContext";

const LeaderBoard: NextPage = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("getScore");

    if (socket.connected) {
      socket.on("leaderboardScore", (score: Score[]) => {
        setScores(score);
      });

      return () => {
        socket.off("leaderboardScore");
      };
    }
  }, [socket]);

  return (
    <>
      <Container maxWidth="md">
        <Stack direction="column" spacing={5} marginTop="30px">
          {scores.map((score, index) => {
            return (
              <ScoreBox
                place={index + 1}
                name={score.name}
                points={score.points}
                key={index}
              />
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default LeaderBoard;
