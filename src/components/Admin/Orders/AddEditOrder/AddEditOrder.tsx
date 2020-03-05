import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Segment, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Order, Book } from '../../../../pages/Store';
import { User } from '../../../../pages/MyProfile';

import { prepareSelectOptions } from '../../../../utils/general';

enum mode {
  EDIT = 'EDIT',
  ADD = 'ADD',
}
interface AddEditOrderProps {
  open: boolean;
  close: any;
  editOrderData: Function;
  order: Order;
  orderId: string;
  loading: boolean;
  operationSuccess: boolean;
  clearSuccess: Function;
  mode: mode;
  addANewOrder: Function;
  users: User[];
  products: Book[];
}

const AddEditOrder: React.FC<any> = (props: AddEditOrderProps) => {
  const [productName, setProductName] = useState(
    props.mode === 'EDIT' ? props.order.productName : ''
  );
  const [user, setUser] = useState(props.mode === 'EDIT' ? props.order.user : '');
  const [datePlaced, setDatePlaced] = useState(props.mode === 'EDIT' ? props.order.datePlaced : '');
  const [cost, setCost] = useState(props.mode === 'EDIT' ? props.order.cost : '');
  const [status, setStatus] = useState(props.mode === 'EDIT' ? props.order.status : '');
  const [formHasErrors, setFormHasErrors] = useState(false);

  const { userOptions, productOptions } = prepareSelectOptions(props.users, props.products);

  useEffect(() => {
    const fields: any[] = [productName, user, cost, status];
    if(props.mode === 'EDIT'){
      fields.push(datePlaced);
    }
    const emptyField: boolean = fields.some(field => field.length < 1);
    if (emptyField) return setFormHasErrors(true);
    return setFormHasErrors(false);
  }, [productName, user, cost, status, datePlaced, props.mode]);

  useEffect(() => {
    if (props.operationSuccess) {
      const message: string =
        props.mode === 'EDIT' ? 'Order Updated successfully' : 'Order Added successfully';
      toast.success(message);
      props.close();
      props.clearSuccess();
    }
  }, [props]);

  const submitForm = (): void => {
    const fields: object = { productName, user, datePlaced, cost, status };
    console.log(fields);
    props.mode === 'EDIT'
      ? props.editOrderData(props.order.id, { ...fields })
      : props.addANewOrder({ ...fields });
  };

  const handleUserSelectChange = (event: any, data: any) => setUser(data.value);
  const handleProductSelectChange = (event: any, data: any) => setProductName(data.value);
  const handleStatusChange = (event: any, data: any) => setStatus(data.value);

  return (
    <Modal size="small" open={props.open} closeOnDocumentClick closeOnDimmerClick>
      <Modal.Header>{props.mode === 'EDIT' ? 'Edit order' : 'Add order'}</Modal.Header>
      <Modal.Content>
        <Form size="large">
          <Segment piled>
            <div className="d-flex justify-content-between mb-1">
              <div className="d-flex justify-content-start w-50">
                <p className="text-bold">Product</p>
              </div>
              <div className="d-flex justify-content-start w-50">
                <p className="text-bold">Customer</p>
              </div>
            </div>
            <Form.Group inline widths="equal">
                <Select
                  fluid
                  placeholder="Product"
                  type="text"
                  value={productName}
                  options={productOptions}
                  onChange={handleProductSelectChange}
                  required
                />

                <Select
                  fluid
                  placeholder="Customer"
                  type="text"
                  value={user}
                  options={userOptions}
                  onChange={handleUserSelectChange}
                  required
                />

            </Form.Group>
            {props.mode === 'EDIT' && (
              <p className="text-bold">
                <label>Order Date</label>
              </p>
            )}

            <Form.Group inline widths="equal">
              {props.mode === 'EDIT' && (
                <Form.Input
                  fluid
                  icon="calendar times outline"
                  iconPosition="left"
                  placeholder="datePlaced"
                  type="date"
                  value={datePlaced}
                  onChange={event => setDatePlaced(event.target.value)}
                  required
                />
              )}
              <Form.Input
                fluid
                icon="dollar"
                iconPosition="left"
                placeholder="Cost"
                type="number"
                value={cost}
                onChange={event => setCost(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group inline widths="equal">
              <label>Status</label>
              <Form.Radio
                label="Pending"
                value="PENDING"
                checked={status === 'PENDING'}
                onChange={handleStatusChange}
              />
              <Form.Radio
                label="Completed"
                value="COMPLETED"
                checked={status === 'COMPLETED'}
                onChange={handleStatusChange}
              />
              <Form.Radio
                label="Declined"
                value="DECLINED"
                checked={status === 'DECLINED'}
                onChange={handleStatusChange}
              />
              <Form.Radio
                label="Cancelled"
                value="CANCELLED"
                checked={status === 'CANCELLED'}
                onChange={handleStatusChange}
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

AddEditOrder.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  operationSuccess: PropTypes.bool.isRequired,
};

export default AddEditOrder;
