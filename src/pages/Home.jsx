import { useState, useEffect } from "react";
import MediaBubble from "../components/MediaBubble";
import { storage, db, auth } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/home.css";

const Home = () => {
  const [mediaData, setMediaData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Default media files
  const defaultMedia = [
    { id: "1", src: "/media/browhat.mp4", type: "video", caption: "Bro What???", username: "System" },
    { id: "2", src: "/media/bruh.jpg", type: "image", caption: "Bruh Meme", username: "System" },
    { id: "3", src: "/media/doge.jpg", type: "image", caption: "Doge Meme", username: "System" },
    { id: "4", src: "/media/elrisitas.mp4", type: "video", caption: "El Risitas Laugh!", username: "System" },
    { id: "5", src: "/media/guncupsong.mp4", type: "video", caption: "Gun Cup Song", username: "System" },
    { id: "6", src: "/media/johncena.jpg", type: "image", caption: "His name is John Cena", username: "System"},
    { id: "7", src: "/media/lol.jpg", type: "image", caption: "LOL Face Meme", username: "System"},
    { id: "8", src: "/media/nootnoot.jpg", type: "image", caption: "Terrified Noot Noot Meme", username: "System"},
    { id: "9", src: "/media/ohhhh.mp4", type: "video", caption: "OHHHHHHHH", username: "System"},
    { id: "10", src: "/media/pepe.jpg", type: "image", caption: "Pepe frog Meme", username: "System"},
    { id: "11", src: "/media/spongebob.jpg", type: "image", caption: "Sponge Bob Sqaure Pants", username: "System"},
    { id: "12", src: "/media/successkid.jpg", type: "image", caption: "Success Kid Meme", username: "System"},
    { id: "13", src: "/media/trollface.jpg", type: "image", caption: "Trollface Meme", username: "System"},
    { id: "14", src: "/media/whattt.mp4", type: "video", caption: "What???", username: "System"},
    { id: "15", src: "/media/willsmith.jpg", type: "image", caption: "Smith Slap Meme", username: "System"}
  ];

  // Get Logged-in User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user.displayName || user.email : null);
    });
    return () => unsubscribe();
  }, []);

  // Initialize with default media
  useEffect(() => {
    setMediaData(defaultMedia);
  }, []);

  // 🔥 Automatically add a random bubble every 5 seconds
  /*useEffect(() => {
    const interval = setInterval(() => {
      const randomBubble = {
        id: `random_${Date.now()}`,
        src: Math.random() > 0.5 ? "/media/sample1.jpg" : "/media/sample3.mp4",
        type: Math.random() > 0.5 ? "image" : "video",
        caption: "Random Bubble",
        username: "AutoBot",
      };
      setMediaData((prev) => [...prev, randomBubble]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);*/

  return (
    <div className="home-container">
      {mediaData.map((media) => (
        <MediaBubble key={media.id} media={media} />
      ))}
    </div>
  );
};

export default Home;
