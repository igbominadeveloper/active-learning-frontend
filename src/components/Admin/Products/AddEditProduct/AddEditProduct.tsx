import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Segment, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Book } from '../../../../pages/Store';

enum mode {
  EDIT = 'EDIT',
  ADD = 'ADD',
}
interface AddEditProductProps {
  open: boolean;
  close: any;
  editProductData: Function;
  product: Book;
  productId: string;
  loading: boolean;
  operationSuccess: boolean;
  clearSuccess: Function;
  mode: mode;
  addANewProduct: Function;
}

const AddEditProduct: React.FC<any> = (props: AddEditProductProps) => {
  const [name, setName] = useState(props.mode === 'EDIT' ? props.product.name : '');
  const [author, setAuthor] = useState(props.mode === 'EDIT' ? props.product.author : '');
  const [specialOffer, setSpecialOffer] = useState(
    props.mode === 'EDIT' ? props.product.specialOffer : false
  );
  const [cover, setCover] = useState(props.mode === 'EDIT' ? props.product.cover : '');
  const [language, setLanguage] = useState(props.mode === 'EDIT' ? props.product.language : '');
  const [formHasErrors, setFormHasErrors] = useState(false);

  useEffect(() => {
    const fields: any[] = [name, author, language];
    const emptyField: boolean = fields.some(field => field.length < 1);
    if (emptyField) return setFormHasErrors(true);
    return setFormHasErrors(false);
  }, [name, author, language]);

  useEffect(() => {
    if (props.operationSuccess) {
      const message: string = props.mode === 'EDIT' ? 'Product Updated successfully' : 'Product Added successfully';
      toast.success(message);
      props.close();
      props.clearSuccess();
    }
  }, [props]);

  const submitForm = (): void => {
    props.mode === 'EDIT'
      ? props.editProductData(props.product.id, {
          name,
          author,
          specialOffer,
          language,
          cover,
        })
      : props.addANewProduct({
          name,
          author,
          specialOffer,
          language,
          cover,
        });
  };

  const handleSelectChange = (event: any, data: any) => setLanguage(data.value);

  const handleCheckBoxChange = (event: any, data: any) => setSpecialOffer(data.checked);

  return (
    <Modal size="small" open={props.open} closeOnDocumentClick closeOnDimmerClick>
      <Modal.Header>{props.mode === 'EDIT' ? 'Edit Product' : 'Add Product'}</Modal.Header>
      <Modal.Content>
        <Form size="large">
          <Segment piled>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Name"
              value={name}
              type="text"
              onChange={event => setName(event.target.value)}
              required
            />
          <Form.Group inline widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Author"
              type="text"
              value={author}
              onChange={event => setAuthor(event.target.value)}
              required
            />

              <Select
                fluid
                placeholder="Language"
                type="text"
                value={language}
                options={[
                  { key: 'eng', value: 'English', text: 'English' },
                  { key: 'rom', value: 'Romanian', text: 'Romanian' },
                ]}
                onChange={handleSelectChange}
                required
              />
            </Form.Group>

            <Form.Input
              fluid
              icon="picture"
              iconPosition="left"
              placeholder="Cover Image url (https://cloudinary.com/my-photo.png)"
              type="text"
              value={cover}
              onChange={event => setCover(event.target.value)}
              required
            />

            <Form.Checkbox
              label="Special Offer"
              toggle
              checked={specialOffer}
              onChange={handleCheckBoxChange}
              required
            />
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

AddEditProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  operationSuccess: PropTypes.bool.isRequired,
};

export default AddEditProduct;
