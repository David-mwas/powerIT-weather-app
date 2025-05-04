// components/UnitSwitcher.tsx
import React from "react";

interface UnitSwitcherProps {
  currentUnit: "metric" | "imperial";
  onUnitChange: (unit: "metric" | "imperial") => void;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = ({
  currentUnit,
  onUnitChange,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={() => onUnitChange("metric")}
        className={`btn ${
          currentUnit === "metric" ? "btn-primary" : "btn-default"
        } btn-sm`}
      >
        °C
      </button>
      <button
        onClick={() => onUnitChange("imperial")}
        className={`btn ${
          currentUnit === "imperial" ? "btn-primary" : "btn-default"
        } btn-sm`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitSwitcher;
