// import fs from 'fs';
// import path from 'path';

// const pluginsDirectory = path.join(process.cwd(), 'plugins');

// export function loadPlugins() {
//   const plugins = [];
  
//   if (!fs.existsSync(pluginsDirectory)) return plugins;

//   const pluginFolders = fs.readdirSync(pluginsDirectory);

//   pluginFolders.forEach((folder) => {
//     const pluginPath = path.join(pluginsDirectory, folder);
//     const pluginIndex = path.join(pluginPath, 'index.js');
//     const pluginConfig = path.join(pluginPath, 'config.json');

//     if (fs.existsSync(pluginIndex) && fs.existsSync(pluginConfig)) {
//       const plugin = require(pluginIndex);
//       const config = JSON.parse(fs.readFileSync(pluginConfig, 'utf-8'));
//       plugins.push({ ...plugin, config });
//     }
//   });

//   return plugins;
// }
