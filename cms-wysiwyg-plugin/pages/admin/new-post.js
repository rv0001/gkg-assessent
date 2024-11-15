// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; // Import Quill's default theme CSS
// import styles from "../../styles/newPost.module.css"; // Add your custom styles

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export default function NewPost() {
//   const [post, setPost] = useState({
//     title: "",
//     slug: "",
//     content: "",
//     youtubeUrl: "",
//   });
//   const [videoEmbedActive, setVideoEmbedActive] = useState(false); // Track if video embed is active
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   // Fetch plugins on page load
//   useEffect(() => {
//     const fetchPlugins = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/posts/plugins");
//         if (!response.ok) throw new Error("Failed to fetch plugins.");
//         const plugins = await response.json();

//         // Check if the video embed plugin is active
//         const videoPlugin = plugins.find(
//           (plugin) => plugin.name === "Video Embed" && plugin.isActive === 1
//         );
//         setVideoEmbedActive(!!videoPlugin); // Set the state based on plugin status
//       } catch (err) {
//         console.error("Error fetching plugins:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlugins();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPost({ ...post, [name]: value });
//   };

//   const handleEditorChange = (value) => {
//     setPost({ ...post, content: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5001/api/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(post),
//     });

//     if (response.ok) {
//       alert("Post created successfully!");
//       router.push("/admin/post");
//     } else {
//       alert("Failed to create post");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <Link href="/admin/post">
//         <button className={styles.backButton}>Home</button>
//       </Link>
//       <h1 className={styles.title}>Create New Post</h1>

//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         <input
//           type="text"
//           name="title"
//           value={post.title}
//           onChange={handleInputChange}
//           placeholder="Post Title"
//           className={styles.inputField}
//         />

//         <input
//           type="text"
//           name="slug"
//           value={post.slug}
//           onChange={handleInputChange}
//           placeholder="Post Slug"
//           className={styles.inputField}
//         />

//         <div className={styles.editorContainer}>
//           <ReactQuill
//             value={post.content}
//             onChange={handleEditorChange}
//             placeholder="Write your post content here..."
//             theme="snow"
//           />
//         </div>

//         {/* Show YouTube URL input field if the video embed plugin is active */}
//         {videoEmbedActive && (
//           <input
//             type="text"
//             name="youtubeUrl"
//             value={post.youtubeUrl}
//             onChange={handleInputChange}
//             placeholder="Add YouTube Video URL"
//             className={styles.inputField}
//           />
//         )}

//         <button type="submit" className={styles.button}>
//           Create Post
//         </button>
//       </form>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill's default theme CSS
import styles from "../../styles/newPost.module.css"; // Add your custom styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewPost() {
  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    youtubeUrl: "",
  });
  const [videoEmbedActive, setVideoEmbedActive] = useState(false); // Track if video embed is active
  const [loading, setLoading] = useState(true);
  const [isPreview, setIsPreview] = useState(false); // Track if in preview mode

  const router = useRouter();

  // Fetch plugins on page load
  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/posts/plugins");
        if (!response.ok) throw new Error("Failed to fetch plugins.");
        const plugins = await response.json();

        // Check if the video embed plugin is active
        const videoPlugin = plugins.find(
          (plugin) => plugin.name === "Video Embed" && plugin.isActive === 1
        );
        setVideoEmbedActive(!!videoPlugin); // Set the state based on plugin status
      } catch (err) {
        console.error("Error fetching plugins:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlugins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleEditorChange = (value) => {
    setPost({ ...post, content: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const response = await fetch("http://localhost:5001/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      alert("Post created successfully!");
      router.push("/admin/post");
    } else {
      alert("Failed to create post");
    }
  };

  const handleSavePreview = async () => {
    await handleSubmit();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link href="/admin/post">
        <button className={styles.backButton}>Home</button>
      </Link>
      <h1 className={styles.title}>Create New Post</h1>

      <button
        className={styles.previewButton}
        onClick={() => setIsPreview(!isPreview)}
      >
        {isPreview ? "Edit Post" : "Preview Post"}
      </button>

      {isPreview ? (
        <div className={styles.previewContainer}>
          <h2 className={styles.previewTitle}>{post.title}</h2>
          <p className={styles.previewSlug}>{post.slug}</p>
          <div
            className={styles.previewContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.youtubeUrl && (
            <div className={styles.previewVideo}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${post.youtubeUrl.split("v=")[1]}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Save button in preview mode */}
          <button
            className={styles.button}
            onClick={handleSavePreview}
          >
            Create Post
          </button>
        </div>
      ) : (
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
              onChange={handleEditorChange}
              placeholder="Write your post content here..."
              theme="snow"
            />
          </div>

          {/* Show YouTube URL input field if the video embed plugin is active */}
          {videoEmbedActive && (
            <input
              type="text"
              name="youtubeUrl"
              value={post.youtubeUrl}
              onChange={handleInputChange}
              placeholder="Add YouTube Video URL"
              className={styles.inputField}
            />
          )}

          <button type="submit" className={styles.button}>
            Create Post
          </button>
        </form>
      )}
    </div>
  );
}
