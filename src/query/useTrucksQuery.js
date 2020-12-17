import { useQuery } from 'react-query';

export function useTrucksQuery() {
  return useQuery(
    'trucks',
    async () => {
      const res = await fetch(`${process.env.REACT_APP_HOSTED_BACKEND}/trucks`);
      return res.json();
    },
    {
      cacheTime: 60000,
      refetchOnWindowFocus: false,
    }
  );
}
