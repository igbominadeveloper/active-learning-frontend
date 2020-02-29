import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { User } from '../../../../pages/MyProfile';

interface EditUserProps {
  open: boolean;
  close: any;
  editUserData: Function;
  user: User;
  userId: string;
  loading: boolean;
  operationSuccess: boolean;
  clearSuccess: Function;
}

const EditUser: React.FC<any> = (props: EditUserProps) => {

  const [email, setEmail] = useState(props.user.email)
  const [username, setUserName] = useState(props.user.username);
  const [phone, setPhone] = useState(props.user.phone);
  const [fullName, setFullName] = useState(props.user.fullName);
  const [formHasErrors, setFormHasErrors] = useState(false);

  useEffect(() => {
    const fields: string[] = [email, fullName, phone, username];
    const emptyField:boolean = fields.some(field => field.length < 1);
    if(emptyField) return setFormHasErrors(true);
    return setFormHasErrors(false);
  }, [email, fullName, phone, username]);

  useEffect(() => {
    if(props.operationSuccess){
      toast.success('User Updated successfully');
      props.close();
      props.clearSuccess();
    }
  }, [props]);

  const submitForm = ():void => {
    props.editUserData(props.user.id, { email, username, phone, fullName});
  } 

  return (
    <Modal size="small" open={props.open} closeOnDocumentClick closeOnDimmerClick>
      <Modal.Header>Edit {props.user.fullName}'s details</Modal.Header>
      <Modal.Content>
        <Form size="large">
          <Segment piled>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              type="email"
              onChange={event => setEmail(event.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="FullName"
              type="text"
              value={fullName}
              onChange={event => setFullName(event.target.value)}
              required
            />

            <Form.Group inline widths="equal">
              <Form.Input
                fluid
                icon="mobile"
                iconPosition="left"
                placeholder="Phone Number"
                type="number"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                required
              />
              <Form.Input
                fluid
                icon="user secret"
                iconPosition="left"
                placeholder="Username"
                type="text"
                value={username}
                onChange={event => setUserName(event.target.value)}
                required
              />
            </Form.Group>
          </Segment>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>Cancel</Button>
        <Button color="teal" disabled={formHasErrors} loading={props.loading} onClick={submitForm}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  operationSuccess: PropTypes.bool.isRequired,
};

export default EditUser;
