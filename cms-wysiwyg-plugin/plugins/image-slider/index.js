// /plugins/image-slider/index.js
import Slider from './components/Slider';

export default {
  name: 'Image Slider',
  version: '1.0.0',
  description: 'A simple image slider plugin.',
  init() {
    console.log('Image Slider Plugin Initialized');
  },
  registerContentBlock(type, component) {
    if (type === 'image-slider') {
      CMS.registerFrontendBlock('image-slider', Slider);
    }
  },
};
