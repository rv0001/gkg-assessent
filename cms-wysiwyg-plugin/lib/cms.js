// /lib/cms.js
class CMS {
    constructor() {
      this.blocks = {};
    }
  
    // Register a frontend block
    registerFrontendBlock(type, component) {
      this.blocks[type] = component;
    }
  
    // Render a content block
    renderBlock(type, props) {
      const BlockComponent = this.blocks[type];
      if (BlockComponent) {
        return <BlockComponent {...props} />;
      }
      return null;
    }
  }
  
  export const CMS = new CMS();
  