import mainPic from '@/assets/imgs/page_1.svg'
import { useEffect, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MainText = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="flex items-end w-full h-screen text-[100px] leading-[125px] pb-[100px]">
      <div>
        <div>Data as raw</div>
        <div>asset for AI age</div>
      </div>
    </div>
  )
})

MainText.displayName = 'MainText'

const PageOne = () => {
  const pageRef = useRef(null)
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const img = imgRef.current
    
    // 清除任何现有的 ScrollTrigger 实例
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    // 创建时间轴
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        markers: true,
        onLeave: () => console.log("ScrollTrigger left"),
        onEnterBack: () => console.log("ScrollTrigger back"),
      }
    })
    
    // 配置动画序列
    tlRef.current
      // 第一阶段: 0-25% - 保持在底部不动
      .add("start")
      .to([text, img], {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1
      }, "start")
      
      // 第二阶段: 25-50% - 上移到屏幕中间
      .add("moveToCenter", ">")
      .to([text, img], {
        y: () => -window.innerHeight * 0.25,
        duration: 1
      }, "moveToCenter")
      
      // 第三阶段: 50-75% - 上移并模糊消失
      .add("moveAndFade", ">")
      .to([text, img], {
        y: () => -window.innerHeight * 0.5,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1
      }, "moveAndFade");

    // 鼠标移动效果
    const handleMouseMove = (e) => {
      if (!img) return;
      
      const rect = img.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;
      
      // 计算鼠标到图片中心的距离
      const distanceX = e.clientX - imgCenterX;
      const distanceY = e.clientY - imgCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // 设置最大距离阈值（可以根据需要调整）
      const maxDistance = 500;
      
      // 计算缩放比例：距离越近，scale越大
      const scale = 1 + (1 - Math.min(distance / maxDistance, 1)) * 0.15;
      
      // 使用 GSAP 平滑过渡到新的缩放值
      gsap.to(img, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // 添加鼠标移动事件监听
    window.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  return (
    <div ref={pageRef} className="h-screen w-screen overflow-hidden px-[3.125vw]">
      <MainText ref={textRef} />
      <img 
        ref={imgRef} 
        src={mainPic} 
        alt="mainPic" 
        className="absolute bottom-0 right-0 w-[50vw] transform-gpu" 
      />
    </div>
  );
}

export default PageOne;