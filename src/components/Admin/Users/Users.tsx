import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import Row from '../Tables/Row';
import Placeholder from '../../Placeholder';

import { User } from '../../../pages/MyProfile';

const headings: string[] = ['FullName', 'Email', 'Phone Number', 'Actions'];

const actions = {
  editAction: () => {},
  deleteAction: () => {},
};

interface Users {
  fetchAllUsers: Function;
  users: [User];
  loading: boolean;
}

const Users: React.FC<Users> = ({ fetchAllUsers, users, loading }: Users) => {
  useEffect(() => {
    fetchAllUsers();
    return () => {};
  }, [fetchAllUsers]);

  return (
    <>
      <h3>Users</h3>
      <Table striped>
        <Header headings={headings} />
        <Table.Body>
          {
            loading ? <Placeholder /> : (
              users.length > 0 ? (
                users.map(user => (
                  <Row
                    key={Math.random().toFixed(5)}
                    actions={actions}
                    email={user.email}
                    fullName={user.fullName}
                    phone={user.phone}
                  />
                ))
              ) : <span>No User found</span>
            )
          }
        </Table.Body>
      </Table>
    </>
  );
};
export default Users;
