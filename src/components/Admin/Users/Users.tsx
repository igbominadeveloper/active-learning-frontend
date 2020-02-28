import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import UserRow from '../Tables/UserRow';
import Placeholder from '../../Placeholder';
import DecisionModal from '../../LogoutModal';
import EditUser from './EditUser';

import { User } from '../../../pages/MyProfile';

import useModal from '../../../custom-hooks/useModal';
import { useUsersForm } from '../../../custom-hooks/useFormStates';
import { exportTableToCSV } from '../../../utils/general';

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
  const { openEditModal, toggleEditModal, openDeleteModal, toggleDeleteModal } = useModal();
  const { setUser, user } = useUsersForm();

  useEffect(() => {
    fetchAllUsers();
    return () => {};
  }, [fetchAllUsers]);

  const openEditModalHandler = (userToEdit: User): void => {
    setUser(userToEdit);
    toggleEditModal();
  };

  const openDeleteModalHandler = (userToDelete: User): void => {
    setUser(userToDelete);
    toggleDeleteModal();
  } 

  const actions = {
    openEditModal: openEditModalHandler,
    openDeleteModal: openDeleteModalHandler,
  };

  const handleDeleteUser = ():void => {
    deleteUserAccount(user.id);
  };

  return (
    <>
    <div className="d-flex justify-content-center" style={{  }}>
      <h3 className="mb-0">Users</h3>
      <p className="cursor-pointer" onClick={() => exportTableToCSV('users.csv')} style={{ marginLeft: '20rem'  }}>Export to csv</p>
    </div>
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
              <UserRow
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
      {openEditModal && (
        <EditUser
          open={openEditModal}
          close={toggleEditModal}
          user={user}
          loading={loading}
          editUserData={editUserData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )}
      {openDeleteModal && (
        <DecisionModal
          open={openDeleteModal}
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
