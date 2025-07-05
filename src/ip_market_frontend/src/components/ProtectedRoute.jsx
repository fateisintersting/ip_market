// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./auth/InternetIndenityAuth";

export default function ProtectedRoute({ children }) {;
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();


  useEffect(() => {
    if (!isAuthenticated === true && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading ,navigate]);

  if (loading) return <p>Loading...</p>;


  return isAuthenticated ? children : null;
}
