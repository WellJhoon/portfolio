import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0d12",
          borderRadius: 6,
          border: "1.5px solid #e11d48",
          boxShadow: "0 0 8px rgba(225, 29, 72, 0.4)",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "-0.05em"
        }}
      >
        <span style={{ color: "#e11d48", marginRight: 1 }}>&gt;</span>
        <span style={{ color: "#f5f0ea" }}>J</span>
      </div>
    ),
    {
      ...size
    }
  );
}
