// components/Preview.js
import React from 'react';

const Preview = ({ content }) => {
  return (
    <div className="preview-container">
      <h2>Preview</h2>
      {/* Render the HTML content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Preview;
