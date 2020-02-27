import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { logout } from '../../utils/general';

interface IProps {
  open: boolean;
  close: any;
};

const LogoutModal: React.FC<any> = (props: IProps) => (
  <Modal size="mini" open={props.open} closeOnDocumentClick closeOnDimmerClick>
    <Modal.Header>Logout</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to logout?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.close}>
        No
      </Button>
      <Button color="teal" onClick={logout}>Yes</Button>
    </Modal.Actions>
  </Modal>
);

LogoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LogoutModal;
