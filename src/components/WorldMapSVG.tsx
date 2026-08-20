"use client";

import { useMemo } from "react";
import { feature } from "topojson-client";
import worldTopology from "world-atlas/countries-110m.json";

const MAX_LAT = 84;
const MIN_LAT = -58;
const LAT_SPAN = MAX_LAT - MIN_LAT;

function project(lng: number, lat: number, width = 1000, height = 500): [number, number] {
  const x = ((lng + 180) / 360) * width;
  const clampedLat = Math.max(MIN_LAT, Math.min(MAX_LAT, lat));
  const y = ((MAX_LAT - clampedLat) / LAT_SPAN) * height;
  return [x, y];
}

function geoToSvgPath(geometry: any, width = 1000, height = 500): string {
  if (!geometry || !geometry.coordinates) return "";
  let pathStr = "";

  const renderRing = (ring: number[][]) => {
    if (!ring || ring.length === 0) return "";
    let subPath = "";
    let prevLng = ring[0][0];

    for (let i = 0; i < ring.length; i++) {
      const [lng, lat] = ring[i];
      if (lat < -60) continue;

      const [x, y] = project(lng, lat, width, height);

      if (i === 0 || Math.abs(lng - prevLng) > 100) {
        subPath += `M${x.toFixed(1)},${y.toFixed(1)} `;
      } else {
        subPath += `L${x.toFixed(1)},${y.toFixed(1)} `;
      }
      prevLng = lng;
    }

    if (subPath && ring.length > 2 && Math.abs(ring[0][0] - ring[ring.length - 1][0]) <= 100) {
      subPath += "Z ";
    }
    return subPath;
  };

  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) {
      pathStr += renderRing(ring);
    }
  } else if (geometry.type === "MultiPolygon") {
    for (const poly of geometry.coordinates) {
      for (const ring of poly) {
        pathStr += renderRing(ring);
      }
    }
  }
  return pathStr;
}

export default function WorldMapSVG() {
  const countryPaths = useMemo(() => {
    try {
      const geojson: any = feature(worldTopology as any, (worldTopology as any).objects.countries);
      if (geojson && geojson.features) {
        return geojson.features
          .filter((f: any) => f.id !== "010")
          .map((f: any, idx: number) => ({
            id: f.id || idx,
            path: geoToSvgPath(f.geometry, 1000, 500)
          }));
      }
    } catch {}
    return [];
  }, []);

  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {countryPaths.map((item: any) => (
        <path
          key={item.id}
          d={item.path}
          fill="rgba(225, 29, 72, 0.18)"
          stroke="rgba(225, 29, 72, 0.65)"
          strokeWidth="0.75"
          className="transition-colors hover:fill-[rgba(225,29,72,0.45)] hover:stroke-[rgba(225,29,72,0.95)]"
        />
      ))}
    </svg>
  );
}
