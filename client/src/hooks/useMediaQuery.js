import { useEffect, useState } from 'react';

export default function useMediaQuery(mediaQuery) {
  const [media, setMedia] = useState(null);

  function checkQuery() {
    const matches = window.matchMedia(mediaQuery).matches;
    setMedia(matches);
  }

  useEffect(() => {
    checkQuery();
    window.addEventListener('resize', checkQuery);
    return () => window.removeEventListener('resize', checkQuery);
  }, []);

  return media;
}

