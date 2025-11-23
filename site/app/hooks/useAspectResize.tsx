import { useState, useEffect, useRef, type RefObject } from "react";
const frameProportion = 1.78; //png frame aspect ratio
const frames = 25; //number of png frames
  
export default function useAspectResize(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    console.log(ref)
    const resize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let width, height;

      if( windowWidth/windowHeight > frameProportion ) {
        width = windowWidth;
        height = width / frameProportion;
      } else {
        height = windowHeight;
        width = height * frameProportion;
      }

      window.requestAnimationFrame((time) => {
        if (!!ref) {
          const current = ref.current as HTMLElement;
          current.style.width = (width * frames) + 'px'
          current.style.height = height + 'px'
        }
      })
    }

    window.addEventListener("resize", resize);

    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);
}