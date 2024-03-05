import { useContext, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { filterPagesByRoles } from '../util/pageFilter';

export default function AppRoutes() {
  const { userData } = useContext(AuthContext);

  const availablePages = useMemo(() => {
    return filterPagesByRoles(userData);
  }, [userData]);

  const routes = useMemo(() => {
    return availablePages.map((page) => <Route key={page.page} path={page.route} element={<page.component />} />);
  }, [availablePages]);

  return <Routes>{routes}</Routes>;
}
