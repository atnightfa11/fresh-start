import { useEffect, useState } from 'react';

export function useTimeAgo(timestamp: Date) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const update = () => {
      const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
      ];

      for (let { label, seconds: s } of intervals) {
        const interval = Math.floor(seconds / s);
        if (interval >= 1) {
          setTimeAgo(`${interval} ${label}${interval === 1 ? '' : 's'} ago`);
          break;
        }
      }
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
} 