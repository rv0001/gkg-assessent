// /lib/pluginManager.js
import fs from 'fs';
import path from 'path';

class PluginManager {
  constructor(pluginDirectory) {
    this.pluginDirectory = pluginDirectory;
    this.plugins = [];
  }

  // Load all plugins from the plugin directory
  loadPlugins() {
    const pluginDirs = fs.readdirSync(this.pluginDirectory);

    pluginDirs.forEach((pluginDir) => {
      const pluginPath = path.join(this.pluginDirectory, pluginDir);
      if (fs.lstatSync(pluginPath).isDirectory()) {
        const plugin = require(pluginPath);  // Dynamically require plugin
        this.plugins.push(plugin);
      }
    });

    // Initialize each plugin
    this.plugins.forEach((plugin) => {
      if (plugin.init) {
        plugin.init(); // Call init method if exists
      }
    });
  }

  // Register a content block type
  registerContentBlock(type, component) {
    this.plugins.forEach((plugin) => {
      if (plugin.registerContentBlock) {
        plugin.registerContentBlock(type, component);
      }
    });
  }
}

export default PluginManager;
