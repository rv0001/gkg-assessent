// /pages/index.js (Main CMS Page)
import { CMS } from '../lib/cms';
import React from 'react';

export default function Home() {
  const content = [
    { type: 'image-slider', images: [{ src: '/img1.jpg', alt: 'Image 1' }, { src: '/img2.jpg', alt: 'Image 2' }] },
  ];

  return (
    <div>
      {content.map((block, index) => {
        return CMS.renderBlock(block.type, block);
      })}
    </div>
  );
}
