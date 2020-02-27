import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

const UserProfile: React.FC = () => (
  <Card>
    <Card.Content>
      <Image
        floated="right"
        size="mini"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
      />
      <Card.Header>Steve Sanders</Card.Header>
      <Card.Meta>Friends of Elliot</Card.Meta>
      <Card.Description>
        Steve wants to add you to the group <strong>best friends</strong>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">
          Approve
        </Button>
        <Button basic color="red">
          Decline
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default UserProfile;
