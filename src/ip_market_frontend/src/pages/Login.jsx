import React, { useEffect } from "react";
import { useAuth } from "../components/auth/InternetIndenityAuth";
import { useNavigate } from "react-router";

export default function Login() {
  const { login, isAuthenticated, principal, logout } = useAuth();
    const navigate = useNavigate();

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome to Dapp</h1>

        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-gray-600">Logged in as:</p>
            <p className="font-mono text-sm text-indigo-600">{principal}</p>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            
            onClick={() => login(navigate)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition shadow-md"
          >
            Login with Internet Identity
          </button>
        )}
      </div>
    </div>
  );
}
