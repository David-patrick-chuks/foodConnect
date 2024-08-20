import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="p-4 bg-red-800">
      <h3 className="text-xl font-semibold mb-4">Search Results</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="border-b py-2">
            <p className="font-semibold">{result?.itemName}</p>
            <p>{result?.description}</p>
            <p className="text-gray-500">{result?.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
