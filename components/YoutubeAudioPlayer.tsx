import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from "axios";

interface YoutubeAudioPlayerProps {
  youtubeUrl: string;
}

const getMetadata = async (videoUrl: string) => {
  try {
    const requestUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    const result = await axios.get(requestUrl);
    return result.data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
};

const YoutubeAudioPlayer: React.FC<YoutubeAudioPlayerProps> = ({ youtubeUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [title, setTitle] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);  // Tracks the loading state
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (youtubeUrl) {
      setLoading(true);
      getMetadata(youtubeUrl)
        .then((metadata) => {
          if (metadata) {
            setTitle(metadata.title);
            setArtist(metadata.author_name);
            setThumbnail(metadata.thumbnail_url);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [youtubeUrl]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "10px",
        width: "380px",
        height: "100px",
        background: "rgba(37, 36, 36, 0.2)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {loading ? (
        <div style={{ width: "100%", textAlign: "center", fontSize: "14px", color: "#555" }}>
          Loading...
        </div>
      ) : (
        <>
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              style={{
                width: "100px",
                height: "95%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}

          <div style={{ flex: 1, paddingLeft: "10px", paddingTop: "10px" }}>
            <h4
              style={{
                marginTop: "10",
                paddingTop: "10",
                fontSize: "12px",
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
              }}
            >
              {title || "Now Playing"}
            </h4>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#888" }}>
              {artist || "Unknown Artist"}
            </p>

            <ReactPlayer
              ref={playerRef}
              url={youtubeUrl}
              playing={playing}
              volume={volume}
              width="0px"
              height="0px"
              controls={false}
              config={{ youtube: { playerVars: { showinfo: 0, controls: 0 } } }}
            />

            <button
              onClick={() => setPlaying(!playing)}
              disabled={loading} 
              style={{
                cursor: loading ? "not-allowed" : "pointer", 
                background: "transparent",
                border: "none",
                fontSize: "24px",
              }}
            >
              {loading ? (
                <div className="spinner"></div> 
              ) : playing ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default YoutubeAudioPlayer;
