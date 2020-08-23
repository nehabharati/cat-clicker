import React, { useEffect } from "react";
import { ListGroup, Tab, Row, Col, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { getSpecificCat, getAllCats, getCatId } from "../actions/catActions";
import { updateCatClicks } from "../utils/catsInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

function CatList(props) {
  useEffect(() => {
    props.getAllCats();
  }, []);

  function handleClick(e, item) {
    e.preventDefault();
    props.getSpecificCat(item._id);
    item.clicks = item.clicks + 1;

    props.getCatId(item._id);
    updateCatClicks(`http://localhost:5000/cats/update/${item._id}`, item);
  }

  return (
    <div>
      <Tab.Container id="list-group-tabs-example">
        <Row>
          <Col sm={12}>
            <h3>
              <FontAwesomeIcon icon={faChevronCircleDown} className="mr-2" />
              Pick your cat
            </h3>
            {props.catInformation.allCats.map((cat) => (
              <ListGroup onClick={(e) => handleClick(e, cat)} key={cat._id}>
                <ListGroup.Item
                  action
                  href={cat._id}
                  className="cat-info"
                  style={{
                    backgroundColor:
                      props.catInformation.catId === cat._id
                        ? "#007bff"
                        : "white",
                    color:
                      props.catInformation.catId === cat._id ? "#fff" : "#000",
                    border:
                      props.catInformation.catId !== cat._id
                        ? "1px solid #eee "
                        : "1px solid #007bff",
                  }}
                >
                  <span>{cat.name}</span>
                  <span>
                    <Badge pill variant="dark">
                      {cat.clicks}
                    </Badge>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            ))}
          </Col>
        </Row>
      </Tab.Container>
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
  getCatId,
})(CatList);
