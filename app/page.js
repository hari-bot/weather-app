'use client';

import Image from "next/image";
import SearchBar from "./componets/searchBar";

export default async function Home({ searchParams }) {
  const location = searchParams.location || "Chennai";

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=bdb504e98ef54d49a1760256242412&q=${location}`
  );
  const data = await res.json();

  return (
    <main className="bg-gradient-to-b from-[#0034AD] to-[#AAC4FF] h-screen grid grid-cols-4">
      {/* aside */}
      <div className="grid col-span-1 relative">
        <Image
          className="absolute left-0 bottom-0"
          src="/buildings.png"
          alt="buildings"
          width={961}
          height={717}
        />
      </div>
      {/* main */}
      <div className="col-span-3 px-10">
        <div className="my-10 text-white font-bold">
          <h1 className="text-4xl mb-2">Good Morning, {data.location.name}</h1>
          <p>Check out today’s weather information</p>
        </div>
        {/* search bar */}
        <SearchBar />

        {/* weather card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {/* info card */}
          <div className="bg-blue-900 rounded-2xl bg-[url(/cloud.png)] bg-cover bg-no-repeat bg-center flex items-start justify-between px-10 py-6">
            <div>
              <div className="my-5 text-white font-bold">
                <h1 className="flex items-center text-white font-bold text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
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
                  {data.location.name}
                </h1>
                <p className="text-white font-bold text-sm">
                  {data.location.region}, {data.location.country}
                </p>
              </div>
              <div className="text-white font-bold mb-5">
                <h1 className="text-6xl">{data.current.temp_c}°C</h1>
                <p className="text-lg">Feels like {data.current.feelslike_c}°C</p>
              </div>
              <div className="mb-5">
                <p className="text-white text-sm">Weather Forecast</p>
                <h1 className="text-3xl text-white mt-1">
                  {data.current.condition.text}
                </h1>
              </div>
            </div>
            {/* time section */}
            <div className="text-white font-semibold my-5 text-right">
              <h1 className="text-2xl">{data.location.localtime.split(" ")[1]}</h1>
              <p className="text-sm">
                {new Date(data.location.localtime).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="px-10">
            <h1 className="text-xl py-5 font-semibold">
              More details on today's weather
            </h1>
            {/* horizontal weather cards */}
            <div className="flex justify-between gap-5">
              {/* weather card */}
              <div className="bg-gray-100 shadow-md h-[150px] w-[150px] rounded-2xl flex flex-col items-center justify-center">
                <img src="/rainy.png" alt="weather icon" className="w-10 h-10 mb-2" />
                <h1 className="text-lg font-semibold">Humidity</h1>
                <h1 className="text-2xl font-bold">{data.current.humidity}%</h1>
              </div>

              <div className="bg-gray-100 shadow-md h-[150px] w-[150px] rounded-2xl flex flex-col items-center justify-center">
                <img src="/heat.png" alt="weather icon" className="w-10 h-10 mb-2" />
                <h1 className="text-lg font-semibold">Pressure</h1>
                <h1 className="text-2xl font-bold">{data.current.pressure_mb} mb</h1>
              </div>

              <div className="bg-gray-100 shadow-md h-[150px] w-[150px] rounded-2xl flex flex-col items-center justify-center">
                <img src="/windy.png" alt="weather icon" className="w-10 h-10 mb-2" />
                <h1 className="text-lg font-semibold">Wind</h1>
                <h1 className="text-2xl font-bold">{data.current.wind_kph} kph</h1>
              </div>

              <div className="bg-gray-100 shadow-md h-[150px] w-[150px] rounded-2xl flex flex-col items-center justify-center">
                <img src="/cold.png" alt="weather icon" className="w-10 h-10 mb-2" />
                <h1 className="text-lg font-semibold">Visibility</h1>
                <h1 className="text-2xl font-bold">{data.current.vis_km} km</h1>
              </div>

              <div className="bg-gray-100 shadow-md h-[150px] w-[150px] rounded-2xl flex flex-col items-center justify-center">
                <img src="/cyclone.png" alt="weather icon" className="w-10 h-10 mb-2" />
                <h1 className="text-lg font-semibold">UV Index</h1>
                <h1 className="text-2xl font-bold">{data.current.uv}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}