import { 
  motion, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useAnimationFrame,
  useScroll
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { wrap } from '@motionone/utils';

// 圆环配置
const RADIUS = 25; // 半径(vh单位)
const STROKE_WIDTH = 0.1;
const DASH_ARRAY = 2;
const DASH_GAP = 2;
const BASE_VELOCITY = 20; // 基础旋转速度
const SCROLL_SCALING_FACTOR = 150; // 滚动缩放因子
const INACTIVITY_THRESHOLD = 1; // 恢复基础速度的延迟(ms)

export const ScrollCircle = () => {
  const circleRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  
  const prevScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  
  // 跟踪用户滚动状态
  const [isScrolling, setIsScrolling] = useState(false);
  
  // 弹簧系统用于平滑速度变化
  const smoothVelocity = useSpring(0, {
    damping: 30,
    stiffness: 200
  });
  
  // 基础旋转值
  const baseRotation = useMotionValue(0);
  
  // 滚动速度因子 (控制加速/减速程度)
  const velocityFactor = useTransform(
    smoothVelocity, 
    [-2000, 0, 2000], 
    [-4, 0, 4], 
    { clamp: true }
  );
  
  // 方向因子 (1 = 向下滚动, -1 = 向上滚动)
  const directionFactor = useRef(1);
  
  // 滚动进度动画值 - 直接应用到现有元素
  const scale = useTransform(
    scrollYProgress,
    [0.5, 0.25, 0.5, 0.75, 1],
    [0, 1, 1.1, 1, 0.75]
  );
  
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["500px", "0px", "0px", "-250px", "400px"]
  );

  // 监听滚动更新速度
  useEffect(() => {
    const updateVelocity = () => {
      const scrollDistance = scrollY.get();
      const delta = scrollDistance - prevScrollY.current;
      prevScrollY.current = scrollDistance;
      
      // 设置平滑后的速度
      smoothVelocity.set(delta * SCROLL_SCALING_FACTOR);
      
      // 标记为滚动中
      setIsScrolling(true);
      lastScrollTime.current = Date.now();
    };
    
    // 使用最新的事件监听API
    return scrollY.on('change', updateVelocity);
  }, []);

  // 检查是否结束滚动
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      if (now - lastScrollTime.current > INACTIVITY_THRESHOLD && isScrolling) {
        setIsScrolling(false);
        
        // 重置到基础速度（平滑过渡）
        smoothVelocity.set(0);
      }
    };
    
    const intervalId = setInterval(checkInactivity, 50);
    return () => clearInterval(intervalId);
  }, [isScrolling]);

  // 动画帧更新 - 核心旋转逻辑
  useAnimationFrame((t, delta) => {
    // 计算方向因子
    const currentVelocity = velocityFactor.get();
    if (currentVelocity < 0) {
      directionFactor.current = -1;
    } else if (currentVelocity > 0) {
      directionFactor.current = 1;
    }
    
    // 基础旋转 (帧率无关)
    let rotationDelta = directionFactor.current * BASE_VELOCITY * (delta / 1000);
    
    // 应用速度因子 (滚动控制的加速/减速)
    rotationDelta += rotationDelta * currentVelocity;
    
    // 更新旋转角度 (使用wrap处理边界)
    baseRotation.set(wrap(0, 360, baseRotation.get() + rotationDelta));
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      {/* 所有动画直接应用到现有motion.svg元素 */}
      <motion.svg
        ref={circleRef}
        width={`${RADIUS * 2}vh`}
        height={`${RADIUS * 2}vh`}
        viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
        style={{ 
          transformOrigin: '50% 50%',
          rotate: baseRotation,
          scale,
          x: translateX
        }}
      >
        <motion.circle
          cx={RADIUS}
          cy={RADIUS}
          r={RADIUS - STROKE_WIDTH / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${DASH_ARRAY} ${DASH_GAP}`}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};