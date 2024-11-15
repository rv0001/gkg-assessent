// backend/plugins/image-gallery/index.js
export const plugin = {
  name: 'Image Gallery Plugin',
  description: 'Adds an image gallery block to the CMS',
  version: '1.0.0',
  
  // onLoad function to handle plugin setup
  onLoad: () => {
    console.log('Image Gallery Plugin loaded!');
    // Additional initialization code if needed (e.g., fetch data)
  },

  // renderBlock function to render plugin content
  renderBlock: () => {
    return `
      <div class="image-gallery">
        <!-- Plugin-specific HTML code or JSX here -->
        <p>Gallery Placeholder Content</p>
      </div>
    `;
  },
};
