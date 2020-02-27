import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import Row from '../Tables/Row';
import Placeholder from '../../Placeholder';

import { User } from '../../../pages/MyProfile';
import EditUser from './EditUser';

import useModal from '../../../custom-hooks/useModal';
import { useUsersForm } from '../../../custom-hooks/useFormStates';

const headings: string[] = ['FullName', 'Email', 'Phone Number', 'Actions'];

interface Users {
  fetchAllUsers: Function;
  users: [User];
  loading: boolean;
  operationSuccess: boolean;
  editUserData: Function;
  clearSuccess: Function;
}

const Users: React.FC<Users> = ({
  fetchAllUsers,
  users,
  loading,
  editUserData,
  operationSuccess,
  clearSuccess
}: Users) => {
  const { openModal, toggleModal } = useModal();
  const { setUser, user } = useUsersForm();

  useEffect(() => {
    fetchAllUsers();
    return () => {};
  }, [fetchAllUsers]);

  const openEditModal = (userToEdit: User): void => {
    setUser(userToEdit);
    toggleModal();
  };

  const actions = {
    editAction: editUserData,
    deleteAction: () => {},
    openEditModal: openEditModal,
  };

  return (
    <>
      <h3>Users</h3>
      <Table striped>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <Placeholder />
          ) : users.length > 0 ? (
            users.map(user => (
              <Row
                key={Math.random().toFixed(5)}
                actions={actions}
                email={user.email}
                fullName={user.fullName}
                phone={user.phone}
                user={user}
              />
            ))
          ) : (
            <span>No User found</span>
          )}
        </Table.Body>
      </Table>
      {openModal && (
        <EditUser
          open={openModal}
          close={toggleModal}
          user={user}
          loading={loading}
          editUserData={editUserData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )}
    </>
  );
};
export default Users;
