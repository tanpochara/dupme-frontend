import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";

const Tutorial: NextPage = () => {
  return (
    <Container>
      <Box>
        <Typography color="text.primary" variant="h2">
          {" "}
          What is dupme{" "}
        </Typography>
        <Typography color="text.primary" variant="h4">
          {" "}
          dupme is a multiplayer game that each user will have a turn to make
          sequence of piano sound and let the other player copy that sequence,
          and scoring will be given based on the similarity of the pattern
          played. In this case we have implemted the betting system to allow
          user agree and bet on certain amount of money through the blockchain
        </Typography>
      </Box>
      <Box mt="30px" color="text.primary">
        <Typography color="text.primary" variant="h2">
          {" "}
          How to play the game{" "}
        </Typography>
        <div style={{ fontSize: "20px" }}>
          <ol>
            <li>
              {" "}
              first user have to either join room and create room , each room
              will have specified amount of money user required to place.{" "}
            </li>
            <li>
              {" "}
              After joining , you can pressed ready button to tell your opponent
              that user is ready to play{" "}
            </li>
            <li>
              {" "}
              Once both players are ready , the game will start and will
              randomize first plyer to crete the sequence{" "}
            </li>
            <li>
              {" "}
              After the first player have finish making the sequence, the second
              user will need to copy the first player sequnce as much as
              possible{" "}
            </li>
            <li>
              {" "}
              After user have finish copying , the second user will now create
              the sequnce to let the first player copy{" "}
            </li>
            <li>
              {" "}
              Once each player takes turn, the game will be finished and
              redirected to the winner page which will announce the winner and
              let the winner take the betting money{" "}
            </li>
          </ol>
        </div>
      </Box>
    </Container>
  );
};

export default Tutorial;
