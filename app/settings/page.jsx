"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Settings() {
  const router = useRouter();
  const [tempUnit, setTempUnit] = useState("C");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Get temperature unit from localStorage
    const storedTempUnit = localStorage.getItem("tempUnit") || "C";
    setTempUnit(storedTempUnit);

    // Get search history from localStorage
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  // Handle temperature unit change
  const handleUnitChange = (unit) => {
    setTempUnit(unit);
    localStorage.setItem("tempUnit", unit);
  };

  // Go back to home page
  const goBack = () => {
    router.push("/");
  };

  // Delete history item
  const deleteHistoryItem = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Search for a location from history
  const searchLocation = (location) => {
    router.push(`/?location=${encodeURIComponent(location)}`);
  };

  return (
    <main className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen relative overflow-hidden">
      {/* Building image */}
      <div className="absolute -left-100 bottom-0 z-0 h-[100vh]">
        <Image
          src="/buildings.png"
          alt="buildings"
          width={800}
          height={1200}
          className="h-full object-contain object-left-bottom"
        />
      </div>

      {/* Settings content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header with back button */}
          <div className="p-6">
            <button
              onClick={goBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>

          {/* Temperature unit selection */}
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-center mb-6">
              Temperature unit
            </h2>

            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-full flex">
                <button
                  className={`px-8 py-2 rounded-full ${
                    tempUnit === "C"
                      ? "bg-blue-700 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleUnitChange("C")}
                >
                  Celsius
                </button>
                <button
                  className={`px-8 py-2 rounded-full ${
                    tempUnit === "F"
                      ? "bg-blue-700 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleUnitChange("F")}
                >
                  Fahrenheit
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Search history */}
            <h2 className="text-xl font-bold text-center my-6">History</h2>

            <div className="space-y-4 pb-6">
              {searchHistory.length > 0 ? (
                searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <button
                      className="flex items-center text-gray-700 hover:text-blue-700"
                      onClick={() => searchLocation(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                      {item}
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteHistoryItem(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No search history yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
