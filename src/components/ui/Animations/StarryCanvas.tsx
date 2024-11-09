import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  image: HTMLImageElement;
  parallaxFactor: number;
}

const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

const StarryCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars: Star[] = [];

  const createStars = (totalStars: number) => {
    for (let i = 0; i < totalStars; i++) {
      const starImage = new Image();
      starImage.src = "/Icons/star.svg";

      stars.push({
        x: getRandomValue(0, window.innerWidth),
        y: getRandomValue(0, window.innerHeight),
        size: getRandomValue(4, 10),
        speed: getRandomValue(0.05, 0.1),
        angle: getRandomValue(0, 360),
        rotation: getRandomValue(0, 360),
        rotationSpeed: getRandomValue(0.3, 0.5),
        alpha: getRandomValue(0.3, 1),
        image: starImage,
        parallaxFactor: getRandomValue(0.03, 0.06),
      });
    }
  };

  const drawStars = (ctx: CanvasRenderingContext2D, scrollY: number) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((star) => {
      const parallaxY = star.y + scrollY * star.parallaxFactor;

      star.x += star.speed * Math.cos((star.angle * Math.PI) / 180);
      star.y += star.speed * Math.sin((star.angle * Math.PI) / 180);

      if (star.x > window.innerWidth) star.x = 0;
      else if (star.x < 0) star.x = window.innerWidth;

      if (parallaxY > window.innerHeight) star.y = 0;
      else if (parallaxY < 0) star.y = window.innerHeight;

      star.rotation += star.rotationSpeed;

      ctx.save();
      ctx.translate(star.x, parallaxY);
      ctx.rotate((star.rotation * Math.PI) / 180);
      ctx.globalAlpha = star.alpha;
      ctx.drawImage(star.image, -star.size / 2, -star.size / 2, star.size, star.size); // Рисуем изображение звезды
      ctx.restore();
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scrollY = window.scrollY;
        drawStars(ctx, scrollY);
      }
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    createStars(12);
    animate();

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default StarryCanvas;
