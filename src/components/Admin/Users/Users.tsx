import React, { useEffect } from 'react';
import { Table, Tab } from 'semantic-ui-react';

import Header from '../Tables/Header';
import Row from '../Tables/Row';
import Placeholder from '../../Placeholder';
import DecisionModal from '../../LogoutModal';
import EditUser from './EditUser';

import { User } from '../../../pages/MyProfile';

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
  deleteUserAccount: Function;
}

const Users: React.FC<Users> = ({
  fetchAllUsers,
  users,
  loading,
  editUserData,
  operationSuccess,
  clearSuccess,
  deleteUserAccount,
}: Users) => {
  const { openModal, toggleModal } = useModal();
  const { openModal: openDelete, toggleModal: toggleDeleteModal } = useModal();
  const { setUser, user } = useUsersForm();

  useEffect(() => {
    fetchAllUsers();
    return () => {};
  }, [fetchAllUsers]);

  const openEditModal = (userToEdit: User): void => {
    setUser(userToEdit);
    toggleModal();
  };

  const openDeleteModal = (userToDelete: User): void => {
    setUser(userToDelete);
    toggleDeleteModal();
  } 

  const actions = {
    openEditModal: openEditModal,
    openDeleteModal: openDeleteModal,
  };

  const handleDeleteUser = ():void => {
    deleteUserAccount(user.id);
  };

  return (
    <>
      <h3>Users</h3>
      <Table striped>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
            </Table.Row>
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
            <Table.Row>
              <Table.Cell>
                <span></span>
              </Table.Cell>
              <Table.Cell>
                <span></span>
              </Table.Cell>
              <Table.Cell>
                <span>No User Found</span>
              </Table.Cell>
              <Table.Cell>
                <span></span>
              </Table.Cell>
            </Table.Row>
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
      {openDeleteModal && (
        <DecisionModal
          open={openDelete}
          close={toggleDeleteModal}
          heading="Delete User"
          body="Are you sure you want to delete this user?"
          onClick={handleDeleteUser}
          loading={loading}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )}
    </>
  );
};
export default Users;
