export default function Forecast({ data }: any) {
  if (!Array.isArray(data?.list)) {
    return <div></div>;
  }

  const threeDayForecast = data.list.slice(0, 3); // Only next 3 entries

  return (
    <div className="grid grid-cols-3 gap-4 shadow-xl border-2 border-gray-200 p-4 h-full w-full">
      {threeDayForecast.map((day: any, index: number) => (
        <div
          key={index}
          className="card bg-base-200 p-4 text-center shadow-xl border-2 border-gray-200"
        >
          <p className="font-semibold">{new Date(day.dt_txt).toDateString()}</p>
          <p>{day.weather?.[0]?.main}</p>
          <p>{Math.round(day.main.temp)}°</p>
        </div>
      ))}
    </div>
  );
}
