// pages/plugins.js

import { useState, useEffect } from "react";

const PluginsPage = () => {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/posts/plugins"); // Adjust the API endpoint as needed
        if (!response.ok) throw new Error("Failed to fetch plugins.");
        const data = await response.json();
        setPlugins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlugins();
  }, []);

  const togglePluginStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/plugins?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: currentStatus ? 0 : 1 }),
      });

      if (!response.ok) throw new Error("Failed to update plugin status.");

      // Update the plugin list state
      setPlugins((prevPlugins) =>
        prevPlugins.map((plugin) =>
          plugin.id === id ? { ...plugin, isActive: currentStatus ? 0 : 1 } : plugin
        )
      );
    } catch (err) {
      alert(`Error updating plugin: ${err.message}`);
    }
  };

  if (loading) return <p>Loading plugins...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Plugins</h1>
      <ul>
        {plugins.map((plugin) => (
          <li key={plugin.id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <h3>{plugin.name}</h3>
            <p>{plugin.description}</p>
            <div>
              <strong>Status:</strong>{" "}
              {plugin.isActive ? "Active" : "Inactive"}
              <button
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: plugin.isActive ? "red" : "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => togglePluginStatus(plugin.id, plugin.isActive)}
              >
                {plugin.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PluginsPage;
