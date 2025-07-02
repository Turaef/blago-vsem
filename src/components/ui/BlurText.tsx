import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState, useMemo, ReactNode, forwardRef } from 'react';

const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps<T extends keyof React.ReactHTML> {
  text?: string;
  children?: ReactNode;
  as?: T;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurTextInner = <T extends keyof React.ReactHTML = 'p'>(
  {
    text = '',
    children,
    as,
    delay = 100,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = (t) => t,
    onAnimationComplete,
    stepDuration = 0.3,
  }: BlurTextProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const MotionComponent = (motion as any)[as || 'p'];

  const content = text || children || '';
  const elements = useMemo(() => 
    typeof content === 'string' ? (animateBy === 'words' ? content.split(' ') : content.split('')) : [content],
    [content, animateBy]
  );
  
  const [inView, setInView] = useState(false);
  const internalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetRef = (ref || internalRef) as React.RefObject<HTMLElement>;
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(targetRef.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, ref]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(8px)', opacity: 0, y: -20 } // Reduced blur and y-offset
        : { filter: 'blur(8px)', opacity: 0, y: 20 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(4px)',
        opacity: 0.5,
        y: direction === 'top' ? 2.5 : -2.5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <MotionComponent
      ref={ref || internalRef}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {typeof segment === 'string' && segment === ' ' ? '\u00A0' : segment}
            {typeof segment === 'string' && animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};

const BlurText = forwardRef(BlurTextInner) as <T extends keyof React.ReactHTML = 'p'>(
  props: BlurTextProps<T> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.ReactElement;

export default BlurText; 