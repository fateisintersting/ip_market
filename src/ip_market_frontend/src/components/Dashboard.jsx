import React, { useEffect, useState } from "react";
// import { backend } from "../declarations/backend"; // Uncomment and set up your actor

export function Dashboard() {
  const [ips, setIps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIps() {
      setLoading(true);
      try {
        // const ipList = await backend.list_ips(); // Uncomment for real
        const ipList = [
          { id: "1", name: "Test IP", description: "A patented widget", owner: "aaaa-bbbb-cccc" },
        ]; // Demo data
        setIps(ipList);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchIps();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {ips.map(ip => (
            <li key={ip.id}>
              <strong>{ip.name}</strong>: {ip.description} (Owner: {ip.owner})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}