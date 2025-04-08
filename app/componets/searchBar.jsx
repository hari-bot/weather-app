"use client";

import { useState } from "react";

const SearchBar = () => {
  // Setting the location query param on search
  const [location, setLocation] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!location.trim()) return;

    const url = new URL(window.location.href);
    url.searchParams.set("location", location); // Update the query parameter
    window.history.pushState({}, "", url); // Update the URL without reloading the page

    // Trigger a page reload to fetch new data
    window.location.reload();
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="w-full p-3 pl-4 pr-12 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
