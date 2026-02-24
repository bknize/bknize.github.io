import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import portrait from 'src/img/pic.jpg';
import useParallax from '~/hooks/useParallax';

const Portrait = ({ className = '', ...props }: { className?: string, paint: string }) => {
  const { paint } = props;
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 200)

return <motion.div ref={ref} className={`relative ${className}`}
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          style={{ y }}>
        <img className={`w-full h-full contrast-200 grayscale-100 hue-rotate-0 invert-0 opacity-100 saturate-100 sepia-0`} src={portrait} />
        <div className='w-full h-full absolute top-0 left-0 mix-blend-lighten' style={{background: '#FF0094'}}/>
      </motion.div>
}

export default Portrait;