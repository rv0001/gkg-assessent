import fs from 'fs';
import path from 'path';

const pluginsDirectory = path.join(process.cwd(), 'backend', 'plugins');

// This function dynamically loads all plugins in the `plugins` directory
export const loadPlugins = async () => {
  const pluginFiles = fs.readdirSync(pluginsDirectory);
  const plugins = [];

  for (const file of pluginFiles) {
    const pluginPath = path.join(pluginsDirectory, file, 'index.js');

    if (fs.existsSync(pluginPath)) {
      const plugin = await import(pluginPath); // Dynamically import plugin
      plugins.push(plugin.plugin); // Add the plugin's API to the list
      plugin.plugin.onLoad(); // Call onLoad when the plugin is loaded
    }
  }

  return plugins;
};
