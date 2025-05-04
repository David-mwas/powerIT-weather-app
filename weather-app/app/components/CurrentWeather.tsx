import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

const getIcon = (main: string) => {
  switch (main?.toLowerCase()) {
    case "clouds":
      return <WiCloudy size={64} />;
    case "rain":
      return <WiRain size={64} />;
    case "snow":
      return <WiSnow size={64} />;
    default:
      return <WiDaySunny size={64} />;
  }
};

export default function CurrentWeather({ data, city }: any) {
  const date = new Date().toLocaleDateString();
  return (
    <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center justify-between">
      <div>
        {getIcon(data?.weather[0]?.main)}
        <h2 className="text-3xl">{Math.round(data?.main.temp)}°</h2>
        <p className="text-lg">{data?.weather[0]?.description}</p>
      </div>
      <div>
        <p className="text-sm text-muted">
          {date} - {city}
        </p>
      </div>
    </div>
  );
}
