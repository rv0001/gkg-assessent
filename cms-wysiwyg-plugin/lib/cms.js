// /lib/cms.js
class CMS {
    static blocks = {};
  
    static registerBlock(type, renderFunction) {
      CMS.blocks[type] = renderFunction;
    }
  
    static renderBlock(type, props) {
      const Block = CMS.blocks[type];
      if (Block) {
        return <Block {...props} />;
      } else {
        return <div>Unknown block type: {type}</div>;
      }
    }
  }
  
  export { CMS };
  