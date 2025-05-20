"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradient() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    resizeCanvas();

    const gradient1 = {
      x: canvas.width / 2,
      y: canvas.height / 3,
      radius: canvas.width / 4,
    };

    const gradient2 = {
      x: canvas.width / 3,
      y: canvas.height / 2,
      radius: canvas.width / 5,
    };

    const render = () => {
      if (!ctx || !canvas) return;

      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update gradient positions with mouse influence
      gradient1.x = canvas.width / 2 + (mouseX - canvas.width / 2) * 0.1;
      gradient1.y = canvas.height / 3 + (mouseY - canvas.height / 3) * 0.1;

      gradient2.x = canvas.width / 3 + (mouseX - canvas.width / 3) * -0.05;
      gradient2.y = canvas.height / 2 + (mouseY - canvas.height / 2) * -0.05;

      // Draw first gradient
      const grd1 = ctx.createRadialGradient(
        gradient1.x,
        gradient1.y,
        0,
        gradient1.x,
        gradient1.y,
        gradient1.radius
      );
      grd1.addColorStop(0, "rgba(79, 70, 229, 0.15)");
      grd1.addColorStop(1, "rgba(79, 70, 229, 0)");
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw second gradient
      const grd2 = ctx.createRadialGradient(
        gradient2.x,
        gradient2.y,
        0,
        gradient2.x,
        gradient2.y,
        gradient2.radius
      );
      grd2.addColorStop(0, "rgba(147, 51, 234, 0.1)");
      grd2.addColorStop(1, "rgba(147, 51, 234, 0)");
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
}
