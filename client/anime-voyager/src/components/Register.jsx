import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestRegister } from "../requests/LoginRequest";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await requestRegister(username, password);
    if (data.success) {
      navigate("/login");
    } else {
      setErrors(data.errors);
    }
  }

  return (
    <div className="bg flex flex-col items-center">
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white flex flex-col p-4 text-center rounded-lg bg-opacity-50">
      <h1 className="text-6xl font-bold text-indigo-400 mb-10">Register</h1>
      {errors.length > 0 && (
        <div className="bg-red-500 text-white mb-2 p-2 rounded">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-indigo-400 text-black text-xl rounded"
        >
          Register
        </button>
      </form>
      </div>
    </div>
    </div>
  );
}
