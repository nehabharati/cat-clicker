import React, { useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import {
  getSpecificCat,
  getAllCats,
  updateCat,
  getCatId,
} from "../actions/catActions";
import { connect } from "react-redux";
import { updateCatClicks } from "../utils/catsInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

function CatGallery(props) {
  useEffect(() => {
    props.getAllCats();
  }, [props.catInformation.specificCat]);

  function handleClick(e, item) {
    item.clicks = item.clicks + 1;
    e.preventDefault();
    props.getSpecificCat(item._id);
    props.updateCat(item._id, item);
    props.getCatId(item._id);
    updateCatClicks(`http://localhost:5000/cats/update/${item._id}`, item);
  }

  return (
    <div>
      <h3>
        <FontAwesomeIcon icon={faChevronCircleDown} className="mr-2 ml-4" />
        Our favourite cats
      </h3>
      <CardDeck>
        {props.catInformation.allCats.map((cat) => (
          <Card
            key={cat._id}
            onClick={(e) => handleClick(e, cat)}
            style={{
              backgroundColor:
                props.catInformation.catId === cat._id ? "#007bff" : "white",
              color: props.catInformation.catId === cat._id ? "#fff" : "#000",
            }}
          >
            <Card.Img variant="top" src={cat.image} className="card-img" />
            <Card.Body>
              <Card.Title>Name: {cat.name}</Card.Title>
              <Card.Text>Nick name: {cat.nickName}</Card.Text>
              <Card.Text>Clicks: {cat.clicks}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    catInformation: state.catInformation,
  };
};

export default connect(mapStateToProps, {
  getSpecificCat,
  getAllCats,
  updateCat,
  getCatId,
})(CatGallery);
