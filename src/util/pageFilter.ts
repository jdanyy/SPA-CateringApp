import { PAGES_DATA } from '../constants/pagesData';
import { UserData } from '../types/commonTypes';

export function filterPagesByRoles(userData: UserData | undefined) {
  if (!userData) {
    return Object.values(PAGES_DATA).filter((page) => page.availableFor.some((scope) => scope === 'Authentication'));
  }

  return Object.values(PAGES_DATA).filter((page) =>
    page.availableFor.some((scope) => userData.roles.some((userRole) => userRole.name === scope)),
  );
}
