import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/home.css";

const getRandomVelocity = () => (Math.random() - 0.5) * 4; // Speed between -2 and 2

const MediaBubble = ({ media, allBubbles = [] }) => {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth * 0.8,
    y: Math.random() * window.innerHeight * 0.8,
    dx: getRandomVelocity(),
    dy: getRandomVelocity(),
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const moveBubble = () => {
      setPosition((prev) => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;
        let newDx = prev.dx;
        let newDy = prev.dy;

        // Bounce off walls
        if (newX <= 0 || newX + 100 >= window.innerWidth) newDx *= -1;
        if (newY <= 0 || newY + 100 >= window.innerHeight) newDy *= -1;

        // Collision detection with other bubbles
        allBubbles.forEach((bubble) => {
          if (bubble.x !== prev.x && bubble.y !== prev.y) {
            const dist = Math.sqrt((bubble.x - newX) ** 2 + (bubble.y - newY) ** 2);
            if (dist < 110) { // Avoid overlapping by maintaining some space
              newDx *= -1;
              newDy *= -1;
            }
          }
        });

        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });
    };

    const interval = setInterval(moveBubble, 20); // Move every 20ms
    return () => clearInterval(interval);
  }, [allBubbles]);

  return (
    <>
      {!isOpen && (
        <motion.div
          className="media-bubble"
          animate={{ x: position.x, y: position.y }}
          transition={{ ease: "linear", duration: 0.02 }}
          onClick={() => setIsOpen(true)}
        >
          {media.type === "image" ? (
            <img src={media.src} alt="media" />
          ) : (
            <video src={media.src} autoPlay loop muted />
          )}
        </motion.div>
      )}

      {/* Enlarged View */}
      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
          <motion.div
            className="media-expanded"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            {media.type === "image" ? (
              <img src={media.src} alt="media" />
            ) : (
              <video src={media.src} controls autoPlay />
            )}
            <p className="media-info">
              <strong>Type:</strong> {media.type.toUpperCase()}
            </p>
            <p className="media-caption">{media.caption}</p>
          </motion.div>
        </>
      )}
    </>
  );
};

export default MediaBubble;
