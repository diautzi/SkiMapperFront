import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super()
    this.state = {
      myTrails: [],
      currentUser: props.currentUser,
      currentUserImage: ''
    };
  }

  createdAt = (date) => {
    let d = new Date(date)
    let monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    let day = d.getDate();
    let monthIndex = d.getMonth();
    let year = d.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  };

  componentDidMount() {
    fetch("https://serene-lake-00689.herokuapp.com/api/v1/completed_trails")
    .then(resp => resp.json())
    .then(favTrails => this.setState({
      myTrails: favTrails.filter(trail => trail.user_id == this.props.currentUser.id)
    }))
  };

  deleteAccount = (userId) => {
    let id = userId
    id = `${this.props.currentUser.id}`
    console.log(id)
    fetch(`https://serene-lake-00689.herokuapp.com/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(resp => resp.json())
    .then(data => this.props.logout(data))
    this.props.history.push("/login")
  };

  deleteTrail = (id) => {
    fetch(`https://serene-lake-00689.herokuapp.com/api/v1/completed_trails/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(resp => resp.json())
      .then(res => this.setState({
        myTrails: this.state.myTrails.filter(trail => trail.id !== id)
      }))
  };

  render() {
    const currentUser = this.props.currentUser;
    return (
      <div>
        { currentUser ?
          <div style={{ textAlign: "center" }}>
            <div className='profile-container'>
              <img className="profile-pic" src={currentUser.image ? currentUser : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuz4ys13YZ-pwKXvCP-Hq_39sU9ZhHhM-JLPreXfAOHQKvzzcl'} alt="Add-a-profile-pic" />
              <div className='user-data'>
                <div className="name">{currentUser.name}</div><br></br>
                <div className="user-location" > 🌎 {currentUser.location ? currentUser.location : ""} </div><br></br>
                <div className="user-registration-date">Member since: {this.createdAt(currentUser.created_at)}</div>
                <div className="user-registration-date"> Conquered: {this.state.myTrails.length} Peaks </div>
                <br></br>
                <Card.Content extra>
                  <div >
                    <NavLink to="/edit" exact>
                      <Button
                        size='large'
                        color='green'
                        inverted>
                        Update Account
                      </Button>
                    </NavLink>
                    <Button
                      size="large"
                      inverted
                      color='red'
                      onClick={(e) => this.deleteAccount(e)}>
                      Delete Account
                    </Button>
                  </div>
                </Card.Content>
                {
                  this.state.myTrails.length > 0
                    ?
                    <h3 className="name">My favorite Trails</h3>
                    : ""
                }
              </div>
            </div>
          </div>
          :
          null}
        {
          this.state.myTrails.map(trail =>
          <div class="ui centered card fav-trail-name">
            <Card
              image={trail.trail_image}
              header={trail.trail_name} />
            <Button color="red" inverted onClick={() => this.deleteTrail(trail.id)}> Delete </Button>
            </div>)
        }
      </div>
    );
  };
};

export default Profile;