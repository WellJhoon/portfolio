import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
          border: "8px solid #e11d48",
          boxShadow: "0 0 40px rgba(225, 29, 72, 0.5)",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 90,
          letterSpacing: "-0.05em"
        }}
      >
        <span style={{ color: "#e11d48", marginRight: 4 }}>&gt;</span>
        <span style={{ color: "#f5f0ea" }}>JM</span>
      </div>
    ),
    {
      ...size
    }
  );
}
