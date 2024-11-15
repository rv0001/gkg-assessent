import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../../styles/posts.module.css';
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Posts() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('http://localhost:5001/api/posts');
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function fetchPlugins() {
      const res = await fetch('/api/plugin');
      const data = await res.json();
      setPlugins(data);
    }

    fetchPlugins();
  }, []);

  const renderPluginBlock = (plugin) => {
    if (plugin.plugin && plugin.plugin.renderBlock) {
      return (
        <div
          className="plugin-block"
          dangerouslySetInnerHTML={{
            __html: plugin.plugin.renderBlock({ images: plugin.config.images }),
          }}
        />
      );
    }
    return null;
  };

  // Delete post function
  const deletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Update the state to remove the deleted post from the list
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>

      {/* "Create New Post" Button */}
      <div className={styles.createPostButton}>
        <Link href="/admin/new-post">
          <button className={styles.button}>Create New Post</button>
        </Link>
      </div>

      <div className={styles.postsList}>
        {posts?.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postSlug}>{post.slug}</p>
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Edit Button */}
            <Link href={`edit-post/${post.id}`}>
              <button className={styles.readMoreLink}>Edit</button>
            </Link>

            {/* Delete Button */}
            <button
              className={styles.deleteButton}
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
