"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "./componets/searchBar";
import { useRouter } from "next/navigation";

export default function Home({ searchParams }) {
  const router = useRouter();
  const location = searchParams.location || "Chennai";
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempUnit, setTempUnit] = useState("C");

  useEffect(() => {
    // Get temperature unit preference from localStorage
    const storedTempUnit = localStorage.getItem("tempUnit") || "C";
    setTempUnit(storedTempUnit);

    // Fetch weather data
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=bdb504e98ef54d49a1760256242412&q=${location}`
        );
        const data = await res.json();
        setWeatherData(data);

        // Save to search history
        saveToHistory(location);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  // Save search to history
  const saveToHistory = (searchTerm) => {
    if (!searchTerm) return;

    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    // Remove if already exists (to avoid duplicates)
    const filteredHistory = history.filter(
      (item) => item.toLowerCase() !== searchTerm.toLowerCase()
    );

    // Add to beginning of array
    filteredHistory.unshift(searchTerm);

    // Keep only the last 10 searches
    const trimmedHistory = filteredHistory.slice(0, 10);

    localStorage.setItem("searchHistory", JSON.stringify(trimmedHistory));
  };

  // Navigate to settings page
  const goToSettings = () => {
    router.push("/settings");
  };

  if (loading || !weatherData) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-700">
        Loading...
      </div>
    );
  }

  // Format date
  const date = new Date(weatherData.location.localtime);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Get time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;

  // Get temperature based on unit preference
  const temperature =
    tempUnit === "C"
      ? Math.round(weatherData.current.temp_c)
      : Math.round(weatherData.current.temp_f);

  const feelsLike =
    tempUnit === "C"
      ? Math.round(weatherData.current.feelslike_c)
      : Math.round(weatherData.current.feelslike_f);

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

      {/* Main content */}
      <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold">
              Good Morning, {weatherData.location.name}
            </h1>
            <p className="text-sm mt-1">
              Check out today's weather information
            </p>
          </div>
          <button onClick={goToSettings} className="bg-white rounded-full p-2">
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Weather card */}
        <div className="bg-white rounded-3xl mt-8 overflow-hidden shadow-lg">
          {/* Main weather info */}
          <div className="bg-blue-700 p-6 relative overflow-hidden">
            {/* Cloud background */}
            <div className="absolute right-0 top-0 w-full h-full">
              <Image
                src="/cloud.png"
                alt="cloud background"
                layout="fill"
                objectFit="cover"
                className="opacity-30"
              />
            </div>

            <div className="flex justify-between relative z-10">
              {/* Location and temperature */}
              <div>
                <div className="flex items-center text-white mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">
                    {weatherData.location.name}
                  </h2>
                </div>
                <p className="text-white text-sm mb-6">
                  {weatherData.location.region}, {weatherData.location.country}
                </p>

                <div className="text-white mb-6">
                  <h1 className="text-7xl font-bold">
                    {temperature}°{tempUnit}
                  </h1>
                  <div className="flex items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                      />
                    </svg>
                    <p>
                      Feels Like {feelsLike}°{tempUnit}
                    </p>
                  </div>
                </div>

                <div className="text-white">
                  <p className="text-sm">Weather forecast</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {weatherData.current.condition.text}
                  </h3>
                </div>
              </div>

              {/* Time and date */}
              <div className="text-white text-right">
                <h2 className="text-2xl font-bold">{formattedTime}</h2>
                <p className="text-sm">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Weather details */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              More details on today's weather
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Humidity */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center shadow">
                <div className="text-blue-500 mb-2">
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
                      d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75h.75a7.5 7.5 0 0 1 7.5 7.5v.75m-9-9h.75a7.5 7.5 0 0 1 7.5 7.5v.75"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Humidity</p>
                <h4 className="text-2xl font-bold mt-1">
                  {weatherData.current.humidity}%
                </h4>
              </div>

              {/* Wind */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center shadow">
                <div className="text-blue-500 mb-2">
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
                      d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Wind</p>
                <h4 className="text-2xl font-bold mt-1">
                  {weatherData.current.wind_kph} km/h
                </h4>
              </div>

              {/* UV Index */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center shadow">
                <div className="text-orange-500 mb-2">
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Ultraviolet</p>
                <h4 className="text-2xl font-bold mt-1">
                  {Math.round(weatherData.current.uv)}/10
                </h4>
              </div>

              {/* Pressure */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center shadow">
                <div className="text-cyan-500 mb-2">
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
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Pressure</p>
                <h4 className="text-2xl font-bold mt-1">
                  {weatherData.current.pressure_mb} mb
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
