import React from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(() => ({
  borderRadius: "50%",
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
}));

const PaginationButtons = ({
  postsPerPage,
  totalPosts,
  paginate,
  goToNextPage,
  goToPreviousPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <StyledButton type="button" onClick={() => goToPreviousPage()}>
        Prev
      </StyledButton>
      {pageNumbers.map((number) => (
        <StyledButton
          type="button"
          onClick={() => paginate(number)}
          key={number}
        >
          {number}
        </StyledButton>
      ))}
      <StyledButton type="button" onClick={() => goToNextPage()}>
        Next
      </StyledButton>
    </Box>
  );
};

export default PaginationButtons;
