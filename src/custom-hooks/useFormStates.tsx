import { useState } from 'react';
interface usersForm {
  user: any;
  setUser: Function;
}


export const useUsersForm = (): usersForm => {
  const [user, setUser] = useState({});
  return {
    user: user,
    setUser: setUser,
  };
};
