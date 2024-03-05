import { UserData } from '../types/commonTypes';

export function canModify(userData: UserData, role: string) {
  return userData.roles.some((userRole) => userRole.name === role);
}
