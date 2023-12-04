import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/'];

export default function RouteGuard(props) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  const updateAtoms = async () => {
    try {
      let favs = await getFavourites();
      setFavourites(favs);
    } catch (err) {
      console.log(err);
    }
    try {
      let history = await getHistory();
      setSearchHistory(history);
    } catch (err) {
      console.log(err);
    }
  };

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }
  return <>{authorized && props.children}</>;
}
