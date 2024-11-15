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

  function convertToEmbedUrl(url) {
    const videoId = url.split('v=')[1]; // Extract the video ID from the URL
    return `https://www.youtube.com/embed/${videoId}`;
  }

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

  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  // Open video modal
  const openVideoModal = (url) => {
    // console.log(url)
    const embedUrl = convertToEmbedUrl(url);
    setVideoUrl(embedUrl);
    setShowModal(true);
  };

  // Close video modal
  const closeVideoModal = () => {
    setShowModal(false);
    setVideoUrl(null);
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

            {/* Show YouTube video if the youtubeUrl exists */}
            {post.youtubeUrl && (
              <div>
                <button
                  className={styles.videoButton}
                  onClick={() => openVideoModal(post.youtubeUrl)}
                >
                  Watch Video
                </button>
              </div>
            )}

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

      {/* Modal for video */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeVideoModal}>X</button>
            <iframe
              width="560"
              height="315"
              src={`${videoUrl}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}




// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import styles from '../../styles/posts.module.css';
// import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// export default function Posts() {
//   const [posts, setPosts] = useState([]);

//   // Fetch posts from the API
//   useEffect(() => {
//     async function fetchPosts() {
//       const res = await fetch('http://localhost:5001/api/posts');
//       const data = await res.json();
//       setPosts(data);
//     }
//     fetchPosts();
//   }, []);

//   const [plugins, setPlugins] = useState([]);

//   useEffect(() => {
//     async function fetchPlugins() {
//       const res = await fetch('/api/plugin');
//       const data = await res.json();
//       setPlugins(data);
//     }

//     fetchPlugins();
//   }, []);

//   const renderPluginBlock = (plugin) => {
//     if (plugin.plugin && plugin.plugin.renderBlock) {
//       return (
//         <div
//           className="plugin-block"
//           dangerouslySetInnerHTML={{
//             __html: plugin.plugin.renderBlock({ images: plugin.config.images }),
//           }}
//         />
//       );
//     }
//     return null;
//   };

//   function convertToEmbedUrl(url) {
//     const videoId = url.split('v=')[1]; // Extract the video ID from the URL
//     return `https://www.youtube.com/embed/${videoId}`;
//   }

//   // Delete post function
//   const deletePost = async (postId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this post?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5001/api/posts/${postId}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         // Update the state to remove the deleted post from the list
//         setPosts(posts.filter((post) => post.id !== postId));
//       } else {
//         console.error('Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   // State to manage the modal visibility
//   const [showModal, setShowModal] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);

//   // State to manage preview visibility
//   const [showPreview, setShowPreview] = useState(false);

//   // Open video modal
//   const openVideoModal = (url) => {
//     const embedUrl = convertToEmbedUrl(url);
//     setVideoUrl(embedUrl);
//     setShowModal(true);
//   };

//   // Close video modal
//   const closeVideoModal = () => {
//     setShowModal(false);
//     setVideoUrl(null);
//   };

//   // Toggle Preview
//   const togglePreview = () => {
//     setShowPreview(!showPreview);
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>All Posts</h1>

//       {/* "Create New Post" Button */}
//       <div className={styles.createPostButton}>
//         <Link href="/admin/new-post">
//           <button className={styles.button}>Create New Post</button>
//         </Link>
//       </div>

//       <div className={styles.postsList}>
//         {posts?.map((post) => (
//           <div key={post.id} className={styles.postCard}>
//             <h2 className={styles.postTitle}>{post.title}</h2>
//             <p className={styles.postSlug}>{post.slug}</p>

//             {/* Preview Button */}
//             <button
//               className={styles.previewButton}
//               onClick={togglePreview}
//             >
//               {showPreview ? 'Hide Preview' : 'Preview Post'}
//             </button>

//             {/* Show Preview */}
//             {showPreview && (
//               <div
//                 className={styles.previewContent}
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />
//             )}

//             {/* Show YouTube video if the youtubeUrl exists */}
//             {post.youtubeUrl && (
//               <div>
//                 <button
//                   className={styles.videoButton}
//                   onClick={() => openVideoModal(post.youtubeUrl)}
//                 >
//                   Watch Video
//                 </button>
//               </div>
//             )}

//             {/* Edit Button */}
//             <Link href={`edit-post/${post.id}`}>
//               <button className={styles.readMoreLink}>Edit</button>
//             </Link>

//             {/* Delete Button */}
//             <button
//               className={styles.deleteButton}
//               onClick={() => deletePost(post.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for video */}
//       {showModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <button className={styles.closeButton} onClick={closeVideoModal}>X</button>
//             <iframe
//               width="560"
//               height="315"
//               src={`${videoUrl}`}
//               title="YouTube video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
