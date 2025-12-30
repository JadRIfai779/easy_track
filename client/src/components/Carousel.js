import { useState, useEffect } from "react";
import "./Carousel.css";
import photo1 from '../assets/p1.jpg'
import photo2 from '../assets/p2.jpg'
import photo3 from '../assets/p3.jpg'
import photo4 from '../assets/p4.jpg'
import photo5 from '../assets/p5.webp'

export default function Carousel() {
  const images = [
   photo1,photo2,photo3,photo4,photo5
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

   return (
    <div className="carousel">
      <img src={images[index]} className="carousel-img" />
    </div>
  );
}
