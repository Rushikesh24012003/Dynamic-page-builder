import { useState } from "react";


export default function useAuth() {
const [token, setToken] = useState(localStorage.getItem("token"));
const [role, setRole] = useState(localStorage.getItem("role"));


const login = (tk, rl) => {
localStorage.setItem("token", tk);
localStorage.setItem("role", rl);
setToken(tk);
setRole(rl);
};


const logout = () => {
  localStorage.clear();
  setToken(null);
  setRole(null);
};

return { token, role, login, logout };
}