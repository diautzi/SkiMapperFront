import React from "react";
import { Card, Button } from "semantic-ui-react";

class TrailCard extends React.Component {

  difficulty = () => {
    let level;
    if (this.props.trail.difficulty === "blue") {
      level = "Blue";
    } else if (this.props.trail.difficulty === "greenBlue") {
      level = "Intermediate Green";
    } else if (this.props.trail.difficulty === "blueBlack") {
      level = "Intermediate Blue";
    } else if (this.props.trail.difficulty === "black") {
      level = "Black 🔷";
    } else if (this.props.trail.difficulty === "dblack") {
      level = "Double Black 🔷";
    } else if (this.props.trail.difficulty === "green") {
      level = "Easy"
    } else {
      level = "N/A"
    }
    return level;
  };

  displayStars = () => {
    let stars = ''
    if (this.props.trail.stars === 5) {
      stars = '★★★★★';
    } else if (this.props.trail.stars >= 4 && this.props.trail.stars < 5) {
      stars = '★★★★☆';
    } else if (this.props.trail.stars >= 3 && this.props.trail.stars < 4) {
      stars = '★★★☆☆';
    } else if (this.props.trail.stars >= 2 && this.props.trail.stars < 3) {
      stars = '★★☆☆☆';
    } else if (this.props.trail.stars >= 1 && this.props.trail.stars < 2) {
      stars = '★☆☆☆☆';
    } else {
      stars = "no rating yet";
    }
    return stars;
  };

  render() {
    const trail = this.props.trail;
    const showImage = !!trail.imgMedium ? trail.imgMedium : process.env.PUBLIC_URL + 'https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?2214404492633272863';
    return (
      <Card style= {{marginLeft: "53px", marginTop: "20px"}}>
        <div className="trail-card">
          <img className="trail-card-image" src= { showImage } alt="skiImage"/>
          <h4>{trail.name}</h4>
          <strong> Difficulty: {this.difficulty()}</strong>
          <br></br>
          <strong>Location: </strong> {trail.location}
          <div>
            <strong>Rating: {this.displayStars()} </strong>
          </div>
        </div>
        <Button
          color="black"
          centered >
            More details
        </Button>
      </Card>
    );
  };
};

export default TrailCard;