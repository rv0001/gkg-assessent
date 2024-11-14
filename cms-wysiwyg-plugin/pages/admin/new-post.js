import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS
import styles from '../../styles/newPost.module.css'; // Add your custom styles

// Dynamically import React Quill to avoid SSR issues in Next.js
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewPost() {
  const [post, setPost] = useState({
    title: '',
    slug: '',
    content: '',
  });
  const [preview, setPreview] = useState(false); // State to toggle preview
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleEditorChange = (value) => {
    setPost({ ...post, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      alert('Post created successfully!');
      router.push('/admin/post');
    } else {
      alert('Failed to create post');
    }
  };

  const togglePreview = () => {
    if (!preview && !post.content) {
      alert('Please enter content for preview.');
      return;
    }
    setPreview(!preview); // Toggle preview state
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Post</h1>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Post Title"
          className={styles.inputField}
        />

        <input
          type="text"
          name="slug"
          value={post.slug}
          onChange={handleInputChange}
          placeholder="Post Slug"
          className={styles.inputField}
        />

        {/* React Quill Editor for content */}
        <div className={styles.editorContainer}>
          <ReactQuill
            value={post.content}
            onChange={handleEditorChange}
            placeholder="Write your post content here..."
            theme="snow"
          />
        </div>

        {/* Toggle Preview Button */}
        <button
          type="button"
          onClick={togglePreview}
          className={styles.button}
        >
          {preview ? 'Edit' : 'Preview'}
        </button>

        {preview ? (
          post.content || post.title || post.slug ? (
            <div className={styles.previewContainer}>
              <h2>Preview</h2>
              {post.title ? (<><h2>{post.title}</h2></>):""}
              {post.slug ? (<><h4>{post.slug}</h4></>):""}
              {post.content ? (<> <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className={styles.previewContent}
              ></div></>):""}

              {/* <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className={styles.previewContent}
              ></div> */}
            </div>
          ) : (
            <div className={styles.previewContainer}>
              <h2>No Content to Preview</h2>
            </div>
          )
        ) : (
          <button type="submit" className={styles.button}>
            Create Post
          </button>
        )}
      </form>
    </div>
  );
}
