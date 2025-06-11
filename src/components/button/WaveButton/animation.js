// 波浪参数
export const waveConfig = {
  phase: 0,
  speed: 0.08,
  amplitude: 4,
  frequency: 0.8,
  points: 8,
  lineWidth: 1.8,
};

// 绘制平滑曲线函数
export const drawSmoothCurve = (ctx, points) => {
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  const lastIndex = points.length - 1;
  if (points.length > 1) {
    ctx.lineTo(points[lastIndex].x, points[lastIndex].y);
  }
};

// 动画函数
export const animateWave = (ctx, canvas, wave) => {
  // 清除画布，保持透明
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 更新波浪相位
  wave.phase += wave.speed;
  
  // 开始绘制波浪线
  ctx.beginPath();
  
  // 计算左右留白（两边各留4px）
  const startX = 4;
  const endX = canvas.width - 4;
  const centerY = canvas.height / 2;
  
  // 计算每个点的位置
  const points = [];
  for (let i = 0; i < wave.points; i++) {
    const progress = i / (wave.points - 1);
    const x = startX + progress * (endX - startX);
    
    // 点间相位差
    const phaseDelay = i * 0.8;
    
    // 计算幅度 - 头部更强，尾部轻微衰减
    let amplitude = wave.amplitude;
    if (i === 0) {
      amplitude *= 1.4;
    } else if (i > wave.points - 2) {
      amplitude *= 0.8;
    }
    
    // 计算Y坐标
    const yOffset = Math.sin(wave.phase + phaseDelay) * amplitude;
    const y = centerY + yOffset;
    
    points.push({ x, y });
  }
  
  // 绘制平滑曲线
  drawSmoothCurve(ctx, points);
  
  // 设置线条样式并绘制
  ctx.lineWidth = wave.lineWidth;
  ctx.lineCap = "round";
  ctx.stroke();
};
