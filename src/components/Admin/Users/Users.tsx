import React, { useEffect, useState } from 'react';
import { Table, Button, Icon, Pagination, Input } from 'semantic-ui-react';

import Header from '../Tables/Header';
import UserRow from '../Tables/UserRow';
import DecisionModal from '../../DecisionModal';
import EditUser from './AddEditUser';
import RowPlaceholder from '../Tables/RowPlaceholder';

import { User } from '../../../pages/MyProfile';

import useModal from '../../../custom-hooks/useModal';
import { useUsersForm } from '../../../custom-hooks/useFormStates';
import { exportTableToCSV } from '../../../utils/general';

import './Users.scss';

const headings: string[] = ['FullName', 'Email', 'Phone Number', 'Actions'];

type users = User[];
interface Users {
  fetchAllUsers: Function;
  users: users;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [usersToDisplay, setUsersToDisplay] = useState<users>(users);

  useEffect(() => {
    fetchAllUsers();
    return () => {};
  }, [fetchAllUsers]);

  useEffect(() => {
    const limit: number = 5;
    const min = limit * currentPage - limit;
    const max = limit * currentPage;

    if (searchInput.length > 0) {
      const foundUsers = users.filter(user => user.email.toLocaleLowerCase().match(searchInput.toLocaleLowerCase()) || user.fullName.toLocaleLowerCase().match(searchInput.toLocaleLowerCase()));
      return setUsersToDisplay(foundUsers.slice(min, max));
    }

    if (users.length > 0) {
      setUsersToDisplay(users.slice(min, max));
    }
    return () => {};
  }, [currentPage, users, searchInput]);


  const openEditModalHandler = (userToEdit: User): void => {
    setUser(userToEdit);
    toggleEditModal();
  };

  const openDeleteModalHandler = (userToDelete: User): void => {
    setUser(userToDelete);
    toggleDeleteModal();
  };

  const actions = {
    openEditModal: openEditModalHandler,
    openDeleteModal: openDeleteModalHandler,
  };

  const handleDeleteUser = (): void => {
    deleteUserAccount(user.id);
  };

  const handlePageChange = (event: any, data: any) => setCurrentPage(data.activePage);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center Users">
        <div className="d-flex justify-content-end w-50 title">
          <h3 className="mb-0">Users</h3>
        </div>
        <div className="d-flex justify-content-end w-50 body">
          <Input
            onChange={event => setSearchInput(event.target.value)}
            value={searchInput}
            placeholder="Search..."
            icon="search"
            style={{ marginRight: '1rem' }}
          />

          <Button onClick={() => exportTableToCSV('users.csv')} color="teal">
            <Icon name="file excel outline" />
            Export to csv
          </Button>
        </div>
      </div>
      <Table striped stackable>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <RowPlaceholder cells={headings} />
          ) : users.length > 0 ? (
            usersToDisplay.map(user => (
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

      {users.length > 0 && (
        <Pagination
          defaultActivePage={1}
          totalPages={Math.round(users.length / 5)}
          onPageChange={handlePageChange}
        />
      )}
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
          successMessage="User deleted successfully"
        />
      )}
    </>
  );
};

export default Users;
