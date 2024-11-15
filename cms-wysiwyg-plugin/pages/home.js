// import { useEffect, useState } from 'react';
// // import {ImageSlider} from "../components/imageSlider"

// import VideoEmbed from '../components/imageSlider';


// // Define a placeholder for plugin functions
// const pluginFunctions = {
//   renderBlock: (images) => {
//     console.log("images",images)
//     // If you need to dynamically import or change how renderBlock works
//     return `
//       <div class="image-slider">
//         <div class="slides">
//           ${images.map((image) => {
//               return `
//               <div>
//                 <img class="slide"  src="${image.url}">
                 
//                 </img>
//                 <p>${image.caption}</p>
//                 </div>
//               `;
//             })
//             .join('')}
//         </div>
//         <button class="prev">❮</button>
//         <button class="next">❯</button>
//       </div>
//     `;
//   },
// };

// export default function PluginsPage() {
//   const [plugins, setPlugins] = useState([]);
//   const videoArray = [{url:'https://assets.leverageedu.com/school-cover-image/us/yaleuniversity.png',caption:"university images"},{url:'https://assets.leverageedu.com/school-cover-image/us/yaleuniversity.png',caption:"university images"},{url:'https://assets.leverageedu.com/school-cover-image/us/yaleuniversity.png',caption:"university images"},{url:'https://assets.leverageedu.com/school-cover-image/us/yaleuniversity.png',caption:"university images"}]
  
//   // Fetch plugin data from the API
//   useEffect(() => {
//     async function fetchPlugins() {
//       const res = await fetch('/api/plugin');
//       const data = await res.json();
//       setPlugins(data.plugins);
//     }
//     fetchPlugins();
//   }, []);

//   return (
//     <div>
//       <h1>Installed Plugins</h1>
//       {plugins.length === 0 && <p>No plugins installed</p>}
//       {plugins.map((plugin, index) => (
//         <div key={index}>
//           <h2>{plugin.name}</h2>
//           <p>{plugin.description}</p>
//           <p>{plugin.version}</p>

//           {/* Call plugin onLoad function if exists */}
//           {plugin.onLoad && pluginFunctions[plugin.onLoad] && pluginFunctions[plugin.onLoad]()}

//           {/* Render image slider block */}
//           {plugin.renderBlock && pluginFunctions[plugin.renderBlock] && (
//             <VideoEmbed
//             videos={videoArray}
            
//           />

//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
