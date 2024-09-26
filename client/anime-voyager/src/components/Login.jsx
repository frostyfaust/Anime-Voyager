import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { requestLogin } from "../requests/LoginRequest"
import { AuthContext } from "../App"

export default function Login() {
const userManager = useContext(AuthContext);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState("")
  const [loginError, setLoginError] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginError("");
    try {
        const data = await requestLogin(username, password);
        if (data.token) {
        userManager.login(username, data.token);
        navigate("/");
    } 
    }catch (data){
        setErrors(data.errors);
        setLoginError("Invalid username or password");
        
    }
}

  return (
    <div className="bg flex flex-col items-center ">
    <div className="flex flex-1 flex-col items-center justify-center ">
        <div className="bg-white flex flex-col p-4 text-center rounded-lg bg-opacity-50">
            <h1 className="text-6xl font-bold text-indigo-400 mb-12">
                Login
            </h1>
            {loginError && (
            <p className="text-red-500 mb-4">{loginError}</p> // Display the login error
          )}
            {errors.length > 0 && (
                <div className="bg-red-500 text-white mb-2 p-2 rounded">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit}
            >
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
                    Login
                </button>
            </form>
            <Link to="/register" className="text-blue-500 mt-4 text-center bg-white text-black rounded-lg py-4 px-8 shadow-lg bg-opacity-70">
                Don't have an account? Register here.
            </Link>
            </div>
        </div>
    </div>
  )
}