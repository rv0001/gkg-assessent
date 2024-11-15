import { useEffect, useState } from 'react';

export default function HomePage() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function fetchPlugins() {
      const res = await fetch('/api/plugin'); // Fetch plugin data
      const data = await res.json();
      setPlugins(data); // Set the plugin data to state
    }
    fetchPlugins();
  }, []);

  // Function to render the plugin block
  const renderPluginBlock = (plugin) => {
    return (
      <div
        className="plugin-block"
        dangerouslySetInnerHTML={{
          __html: plugin.plugin.renderBlock({ images: plugin.config.images }), // Calling the renderBlock function from the plugin
        }}
      />
    );
  };

  return (
    <div>
      <h1>Welcome to the CMS</h1>
      <h2>Installed Plugins</h2>
      {plugins.length === 0 ? (
        <p>No plugins to display</p>
      ) : (
        plugins.map((plugin, index) => (
          <div key={index}>
            <h3>{plugin.config.name}</h3>
            {renderPluginBlock(plugin)} {/* Render the plugin content */}
          </div>
        ))
      )}
    </div>
  );
}
