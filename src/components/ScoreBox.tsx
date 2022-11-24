import { Avatar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

interface Props {
  place: number;
  name: string;
  points: string;
}

const ScoreBoxStyle = {
  border: "1px solid black",
  width: "100%",
  borderRadius: "16px",
};

export const ScoreBox: React.FC<Props> = ({ place, name, points }) => {
  return (
    <Box
      style={ScoreBoxStyle}
      paddingY="20px"
      paddingX="20px"
      color="text.primary"
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Typography variant="h2"> {place}. </Typography>
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}
            alt={name}
          />
          <Typography variant="h2"> {name} </Typography>
        </Stack>
        <Typography variant="h2"> {points} </Typography>
      </Stack>
    </Box>
  );
};
