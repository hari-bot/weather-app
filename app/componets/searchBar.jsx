"use client";

import React from "react";

const SearchBar = () => {
  // Setting the location query param on search
  const [location, setLocation] = React.useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const url = new URL(window.location.href);
    url.searchParams.set("location", location); // Update the query parameter
    window.history.pushState({}, "", url); // Update the URL without reloading the page

    // Trigger a page reload to fetch new data
    window.location.reload();
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search for a city"
        onChange={(e) => setLocation(e.target.value)} // Update state on input change
        value={location}
        className="w-1/2 p-2 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="ml-2 p-2 bg--500 text-white bg-blue-700 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
        onClick={handleSearch} // Trigger search on button click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
