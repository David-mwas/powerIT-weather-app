import { FaSearch, FaTemperatureHigh } from "react-icons/fa";

export default function SearchBar({ city, setCity, unit, setUnit }: any) {
  return (
    <div className="flex gap-2 items-center  p-2 mb-4">
      <input
        type="text"
        placeholder="Search city..."
        className="input input-bordered w-full shadow-xl border-2 border-gray-200 p-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="flex gap-2 border-2 border-gray-200 p-3">
        <button className="btn btn-primary" onClick={() => setCity(city)}>
          <FaSearch />
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          title="Toggle °C/°F"
        >
          <FaTemperatureHigh />
        </button>
      </div>
    </div>
  );
}
