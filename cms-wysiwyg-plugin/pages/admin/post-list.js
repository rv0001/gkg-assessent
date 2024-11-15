// /pages/admin/post-list.js (Post List Page)
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/posts.module.css';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('http://localhost:5001/api/posts');
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/admin/edit-post?id=${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
