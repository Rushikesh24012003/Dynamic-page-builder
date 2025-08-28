import React from 'react'
import background from "../assets/homeback.jpg";

function HomePage() {
  return (
    <div
      style={{
         backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%", // ✅ shift upward
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      }}
    >
      <h1>Welcome to Dynamic Page Builder</h1>
    </div>
  )
}

export default HomePage
