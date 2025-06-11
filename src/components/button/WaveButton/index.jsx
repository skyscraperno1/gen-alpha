import { useEffect, useRef, useState } from 'react';
import { ButtonWrapper } from "../const";
import { waveConfig, animateWave } from './animation';

export const WaveButton = () => {
  const canvasRef = useRef(null);

  const [isSound, setIsSound] = useState(false);
  useEffect(() => {
    if (!isSound) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // 创建波浪配置的副本
    const wave = { ...waveConfig };

    // 动画循环
    const animate = () => {
      animateWave(ctx, canvas, wave);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSound]);

  return (
    <ButtonWrapper onClick={() => setIsSound(!isSound)} className='w-[70px]'>
      {
        isSound ?
          <canvas
            ref={canvasRef}
            width="30"
            height="30"
          />
          : <span className='text-[14px]'>Sound</span>
      }
    </ButtonWrapper>
  );
};