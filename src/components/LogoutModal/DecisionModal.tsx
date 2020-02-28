import React, { useEffect } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast} from 'react-toastify';

interface IProps {
  open: boolean;
  close: any;
  heading: string;
  body: string;
  onClick: any;
  loading?: boolean;
  operationSuccess?: boolean;
  clearSuccess: Function;
}


const DecisionModal: React.FC<any> = (props: IProps) => {
  useEffect(() => {
    if(props.operationSuccess){
      props.close();
      toast.success('Operation successful');
      props.clearSuccess();
    }
  }, [props])


  return (
    <Modal size="mini" open={props.open} closeOnDocumentClick closeOnDimmerClick>
      <Modal.Header>{props.heading}</Modal.Header>
      <Modal.Content>
        <p>{props.body}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>No</Button>
        <Button color="teal" onClick={props.onClick} loading={props.loading}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

DecisionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DecisionModal;
