import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';


interface IProps {
  open: boolean;
  close: any;
  editUser: Function;
  userObject: object;
  userId: string;
};

const EditUser: React.FC<any> = (props: IProps) => (
  <Modal size="small" open={props.open} closeOnDocumentClick closeOnDimmerClick>
    <Modal.Header>Edit User</Modal.Header>
    <Modal.Content>

    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.close}>
        No
      </Button>
      <Button color="teal">Yes</Button>
    </Modal.Actions>
  </Modal>
);

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default EditUser;
