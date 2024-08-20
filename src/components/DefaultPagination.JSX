import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({ currentPage, totalPosts, postsPerPage, paginate }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const next = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <IconButton
        variant="outlined"
        color="blue"
        size="sm"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </IconButton>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? "filled" : "outlined"}
          color="blue"
          size="sm"
          className="mx-1"
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
      <IconButton
        variant="outlined"
        color="blue"
        size="sm"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
