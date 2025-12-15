import { useEffect, useRef, useState } from 'react';
import useAspectResize from '../hooks/useAspectResize';
import SplatterBus2 from '~/utils/splatterState';
import { observer } from 'mobx-react-lite';

export const splatterBus2 = new SplatterBus2

const PaintSplatter = observer(() => {
  const container = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false)
  const firstSplatter = useRef(true);

  const { sprite, paint, name } = splatterBus2.section

  useAspectResize(container);
  useEffect(() => {
    if (!!name && !!paint) {
      if (firstSplatter.current && name === 'title') {
        firstSplatter.current = false;
      } else {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
      }
    }
  }, [name])
  
    return <div className={`transition-container`} style={{
        backgroundColor: paint,
      }}>
            <div ref={container} style={{backgroundImage: `url("${sprite}")`}}
                className={`transition-layer ${isAnimating ? '__animate': '' }`}
                ></div>
        </div>
})

export default PaintSplatter