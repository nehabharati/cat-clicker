import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Col,
  InputGroup,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { connect } from "react-redux";
import { catDetails, catAge } from "../utils/catDetails";
import { updateCat, getAllCats } from "../actions/catActions";

function CatCard(props) {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [clicks, setClicks] = useState(0);
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [urlRegex] = useState(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  );

  useEffect(() => {
    let myCatAge = catAge(props.catInformation.specificCat.clicks);
    setAge(myCatAge);
  }, [props.catInformation.specificCat.clicks]);

  const onChangeName = (e) => setName(e.target.value);
  const onChangeNickName = (e) => setNickName(e.target.value);
  const onChangeClicks = (e) => setClicks(e.target.value);
  const onChangeImage = (e) => setImage(e.target.value);
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event, item) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);

    const updatedCat = catDetails(
      name,
      nickName,
      clicks,
      image,
      props.catInformation.specificCat
    );
    props.updateCat(item._id, updatedCat);
    setName("");
    setNickName("");
    setClicks(0);
    setImage("");
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="cat-card">
        <Card.Img variant="top" src={props.catInformation.specificCat.image} />
        <Card.Body>
          <Card.Title>Name: {props.catInformation.specificCat.name}</Card.Title>
          <Card.Text>
            Nick name: {props.catInformation.specificCat.nickName}
          </Card.Text>
          <Card.Text>Age: {age}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Update
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your cat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => handleSubmit(e, props.catInformation.specificCat)}
          >
            <h5 className="ml-3 mb-3 mt-3">Add new cat</h5>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Cat name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cat name"
                defaultValue={props.catInformation.specificCat.name}
                onChange={(e) => onChangeName(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Nick name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nick name"
                defaultValue={props.catInformation.specificCat.nickName}
                onChange={(e) => onChangeNickName(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Cat Clicks</Form.Label>
              {props.catInformation.specificCat.clicks ? (
                <Form.Control
                  type="text"
                  placeholder="Clicks"
                  defaultValue={props.catInformation.specificCat.clicks + 1}
                  onChange={(e) => onChangeClicks(e)}
                  required
                />
              ) : (
                <Form.Control
                  type="text"
                  placeholder="Clicks"
                  defaultValue={props.catInformation.specificCat.clicks}
                  onChange={(e) => onChangeClicks(e)}
                  required
                />
              )}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustomURL">
              <Form.Label>Cat Image</Form.Label>
              <InputGroup>
                {props.catInformation.specificCat.image ? (
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    defaultValue={props.catInformation.specificCat.image}
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => onChangeImage(e)}
                    onFocus={() => setShowTooltip(!showTooltip)}
                    ref={target}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    defaultValue={props.catInformation.specificCat.image}
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => onChangeImage(e)}
                    onFocus={() => setShowTooltip(!showTooltip)}
                    ref={target}
                  />
                )}
                <Overlay
                  target={target.current}
                  show={showTooltip}
                  placement="bottom"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Please select an object id from
                      <a href="http://txt.do/1f23o"> here</a>
                      <br />
                      source.unsplash.com/[object id]/640x960
                      <br /> Or paste a URL of your choice
                    </Tooltip>
                  )}
                </Overlay>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please choose a valid url.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {name || nickName || clicks || urlRegex.test(image) ? (
              <Form.Group as={Col} md="12">
                <Button className="save-button" type="submit" active>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="ml-2 mt-3"
                >
                  Close
                </Button>
              </Form.Group>
            ) : (
              <Form.Group as={Col} md="12">
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Please enter new details
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <Button
                      className="save-button"
                      type="submit"
                      disabled
                      style={{ pointerEvents: "none" }}
                    >
                      Save
                    </Button>
                  </span>
                </OverlayTrigger>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="ml-2 mt-3"
                >
                  Close
                </Button>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    catInformation: state.catInformation,
  };
};

export default connect(mapStateToProps, { updateCat, getAllCats })(CatCard);
