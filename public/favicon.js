document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#4f46e5';
  ctx.beginPath();
  ctx.roundRect(0, 0, 64, 64, 12);
  ctx.fill();
  
  // Head
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(32, 24, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Body
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(10, 54);
  ctx.bezierCurveTo(10, 42, 20, 34, 32, 34);
  ctx.bezierCurveTo(44, 34, 54, 42, 54, 54);
  ctx.stroke();
  
  // Generate favicon link
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL();
  document.head.appendChild(link);
}); 