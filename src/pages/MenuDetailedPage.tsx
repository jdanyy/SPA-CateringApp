import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import QueryStateComponent from '../components/QueryStateComponent';
import MenuDetails from '../components/menu/MenuDetails';
import { AuthContext } from '../context/AuthContext';
import { useFetchMenu } from '../query/menuQuery';
import { canModify } from '../util/modifyPermissionSolver';

export default function MenuDetailedPage() {
  const { menuId } = useParams();

  const { userData } = useContext(AuthContext);

  const readOnly = useMemo(() => {
    if (userData) {
      return !canModify(userData, 'CHEF');
    }
    return true;
  }, [userData]);

  const { data, isError, isLoading, error } = useFetchMenu(Number(menuId));

  return (
    <>
      <QueryStateComponent isError={isError} isLoading={isLoading} error={error} />
      {data && <MenuDetails menu={data} isReadOnly={readOnly} />}
    </>
  );
}
