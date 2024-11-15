import { useEffect, useState } from 'react';

export default function AdminPluginPage() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function fetchPlugins() {
      const res = await fetch('/api/plugin'); // Fetching the plugin data from the backend
      const data = await res.json();
      setPlugins(data); // Set the plugins data to state
    }
    fetchPlugins();
  }, []);

  return (
    <div>
      <h1>Installed Plugins</h1>
      {plugins.length === 0 ? (
        <p>No plugins installed</p> // If no plugins are installed, display a message
      ) : (
        <ul>
          {plugins.map((plugin, index) => (
            <li key={index}>
              <h2>{plugin.config.name}</h2>
              <p>{plugin.config.description || 'No description available'}</p>
              <button onClick={() => handlePluginAction(plugin)}>Configure</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
