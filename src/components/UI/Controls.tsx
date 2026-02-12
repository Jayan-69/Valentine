import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaVolumeMute, FaVolumeUp, FaRedo } from 'react-icons/fa';

interface ControlsProps {
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ muted, setMuted }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  // Handle music playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Try to play audio (will be muted by default)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Audio playback failed:", error);
      });
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);
  
  // Toggle mute state
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  
  // Replay intro animation
  const replayIntro = () => {
    // This would be implemented to restart the intro animation
    window.location.reload(); // Simple reload for now
  };

  return (
    <div className="controls-container">
      <audio 
        ref={audioRef} 
        src="/ambient-music.mp3" 
        loop 
        muted={muted}
        preload="auto"
      />
      
      <motion.button
        className="control-button"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={muted ? "Unmute" : "Mute"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </motion.button>
      
      <motion.button
        className="control-button"
        onClick={replayIntro}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Replay Intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FaRedo />
      </motion.button>
      
      <motion.a
        href="https://github.com/yourusername/valentine-3d"
        target="_blank"
        rel="noopener noreferrer"
        className="control-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="View on GitHub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <FaMusic />
      </motion.a>
    </div>
  );
};

export default Controls;
