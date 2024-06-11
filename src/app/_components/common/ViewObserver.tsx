'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onView: (() => void) | null;
  onHide: (() => void) | null;
}
function ViewObserver({ onView = null, onHide = null }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && onView) {
          onView();
        } else if (onHide) onHide();
      });
    }, {});

    const currentRef = ref.current; // Store the current value of the ref
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef); // Use the stored value in the cleanup function
    };
  }, [onView, onHide]);

  return <div id="view-observer" ref={ref} style={{ height: '0.5px' }} />;
}

export default ViewObserver;
