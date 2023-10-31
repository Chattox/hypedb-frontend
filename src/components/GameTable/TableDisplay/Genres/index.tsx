import { Badge, Grid } from "@mantine/core";
import classes from "./Genres.module.css";

export const Genres = (props: { genres: string[] }) => {
  return (
    <Grid justify="center" align="center" gutter="xs">
      {props.genres.map((genre) => (
        <Grid.Col span="content">
          <Badge
            color="var(--mantine-color-hypePurplePrimary-7)"
            classNames={{ label: classes.genreLabel }}
          >
            {genre}
          </Badge>
        </Grid.Col>
      ))}
    </Grid>
  );
};
