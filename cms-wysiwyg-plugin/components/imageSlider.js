// components/VideoEmbed.js

const VideoEmbed = ({ url }) => {
    // Extract the YouTube video ID using a regular expression
    const getYouTubeVideoId = (url) => {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return match ? match[1] : null;
    };
  
    const videoId = getYouTubeVideoId(url);
  
    if (!videoId) {
      return <p>Invalid YouTube URL</p>;
    }
  
    return (
      <div className="video-embed">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default VideoEmbed;
  