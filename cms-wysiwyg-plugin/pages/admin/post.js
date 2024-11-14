import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../../styles/posts.module.css'; 
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      console.log(res)
      setPosts(data);
    }
    fetchPosts();
  }, []);

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
              dangerouslySetInnerHTML={{ __html: post.content }} // This renders the HTML content safely
            />
            {/* <p className={styles.postContent}>
              {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
            </p> */}
            <Link href={`edit-post/${post.id}`}>
              <button className={styles.readMoreLink}>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
