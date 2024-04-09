import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useClock = () => {
  const router = useRouter();

  const [
    date,
    setDate,
  ] = useState<Date>(new Date());

  const time = new Intl.DateTimeFormat(router.locale, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [date]);

  return time;
};
