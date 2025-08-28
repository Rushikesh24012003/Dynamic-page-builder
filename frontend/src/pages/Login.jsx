import React, { useState } from "react";
import client from "../api/client";
import useAuth from "../hooks/useAuth";
import background from "../assets/logoback.jpg";

export default function Login() {
const { login } = useAuth();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");


const handleLogin = async (e) => {
e.preventDefault();
try {
const res = await client.post("/auth/login", { username, password });
login(res.data.token, res.data.role);
window.location.reload();
} catch (err) {
alert("Login failed");
}
};


return (

<div style={{ backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center", }}>
<form className="card"  style={{
    maxWidth: "600px",     
    minHeight: "200px",    
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "12px",
  }}
   onSubmit={handleLogin}>
<h2>Login</h2>
<br />
<input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
<br />
<input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
<br />
<button className="button" type="submit">Login</button>
</form>
</div>
);
}