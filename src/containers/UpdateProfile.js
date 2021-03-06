import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

class UpdateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      name: this.props.currentUser.name,
      image: this.props.currentUser.image,
      location: this.props.currentUser.location,
      email: this.props.currentUser.email
    };
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  submitForm = (e, id) => {
    e.preventDefault();
    id = `${this.props.currentUser.id}`

    fetch(`https://serene-lake-00689.herokuapp.com/api/v1/users/${id}`, {
      method: "PATCH", mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Access-Control-Allow-Origin" :"http://localhost:3000"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        location: this.state.location,
        email: this.state.email
      })
    })
      .then(resp => resp.json())
      .then(resp => this.setState({
        currentUser: resp
      }))
      this.props.history.push('/profile')
  };

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header className="name">
            <Image src={this.state.currentUser.image} /> Update Your Account
         </Header>
          <Form size='large' onSubmit={this.submitForm}>
            <Segment >
              <Form.Input
                onChange={(e) => this.handleChange(e)}
                name="name"
                value={this.state.name}
                placeholder='Name ' />
              <Form.Input
                onChange={(e) => this.handleChange(e)}
                name="image"
                value={this.state.image}
                placeholder='Image URL' />
              <Form.Input
                onChange={(e) => this.handleChange(e)}
                name="location"
                value={this.state.location}
                placeholder='Location' />
              <Form.Input
                onChange={(e) => this.handleChange(e)}
                name="email"
                value={this.state.email}
                placeholder='E-mail address' />
              <Button
                type="submit"
                color='red'
                fluid size='large'
                inverted
              >
                Update Info
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  };
};

export default UpdateProfile;