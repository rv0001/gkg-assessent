import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styles from '../../../styles/edit-post.module.css'; // Ensure the correct path
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditPost() {
  const [post, setPost] = useState({
    title: '',
    slug: '',
    content: '',
    youtubeUrl: '', // Add youtubeUrl to the state
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [videoEmbedActive, setVideoEmbedActive] = useState(false); // Track plugin status
  const router = useRouter();
  const { id } = router.query;

  // Fetch plugins and check if video embed is active
  useEffect(() => {
    if (id) {
      // Fetch the post data from your API
      setLoading(true);
      fetch(`http://localhost:5001/api/posts?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setPost(data);
            setLoading(false); // Stop loading when data is fetched
          } else {
            setError('Post not found'); // Handle if post is not found
            setLoading(false);
          }
        })
        .catch((error) => {
          setError('Error fetching post data');
          setLoading(false);
          console.error('Error fetching post data:', error);
        });

      // Fetch plugins status
      fetch('http://localhost:5001/api/posts/plugins')
        .then((res) => res.json())
        .then((plugins) => {
          const videoPlugin = plugins.find(
            (plugin) => plugin.name === 'Video Embed' && plugin.isActive === 1
          );
          setVideoEmbedActive(!!videoPlugin); // Set the state based on plugin status
        })
        .catch((err) => {
          console.error('Error fetching plugins:', err);
        });
    }
  }, [id]);

  const handleContentChange = (value) => {
    setPost({ ...post, content: value }); // Update content state with editor value
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send updated data to the API
    const response = await fetch(`http://localhost:5001/api/posts?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      alert('Post updated successfully!');
      router.push('/admin/post'); // Redirect after successful update
    } else {
      alert('Failed to update post');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error if any
  }

  return (
    <div className={styles.container}>
      <Link href="/admin/post">
        <button className={styles.backButton}>Home</button>
      </Link>

      <h1 className={styles.title}>Edit Post</h1>

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

        <div className={styles.editorContainer}>
          <ReactQuill
            value={post.content}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
            theme="snow"
            className={styles.quillEditor}
          />
        </div>

        {/* Show YouTube URL input field if the video embed plugin is active */}
        {videoEmbedActive && (
          <input
            type="text"
            name="youtubeUrl"
            value={post.youtubeUrl}
            onChange={handleInputChange}
            placeholder="Edit YouTube Video URL"
            className={styles.inputField}
          />
        )}

        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
