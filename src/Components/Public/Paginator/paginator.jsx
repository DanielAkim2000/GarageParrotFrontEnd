import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginator = (props) => {
  let data = props.data;
  let nombreElementPages = props.nombreElementPages;
  let nombreTotalPage =
    data.length % nombreElementPages === 0
      ? data.length / nombreElementPages
      : Math.floor(data.length / nombreElementPages) + 1;
  return (
    <Stack spacing={2}>
      <Pagination
        count={nombreTotalPage}
        onClick={props.changePage}
        shape="rounded"
      />
    </Stack>
  );
};
export { Paginator };
