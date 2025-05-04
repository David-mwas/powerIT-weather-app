export default function WeatherStats({ data }: any) {
  console.log("WeatherStats data:", data); // Add this
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 border-2 border-gray-200 p-4 rounded-lg h-full w-full">
      <div className="card bg-base-200 p-4 bg-base-100 shadow-xl border-2 border-gray-200">
        <h3 className="text-sm font-medium">Wind Status</h3>
        <p className="text-xl">{data.wind.speed} km/h</p>
        <p className="text-muted">{data.wind.deg}°</p>
      </div>
      <div className="card bg-base-200 p-4 shadow-xl border-2 border-gray-200">
        <h3 className="text-sm font-medium">Humidity</h3>
        <p className="text-xl">{data.main.humidity}%</p>
        <progress
          className="progress w-full"
          value={data.main.humidity}
          max="100"
        />
      </div>
    </div>
  );
}
