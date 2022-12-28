import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/system";

export default function ProfileLoader() {
  return (
    <Stack>
      <Skeleton variant="rectangular" height={300} />
      <Skeleton animation="wave" height={100} />
      <Skeleton variant="rectangular" height={200} />
    </Stack>
  );
}
