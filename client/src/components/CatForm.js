import React, { useState, useRef } from "react";
import {
  Form,
  Col,
  Button,
  InputGroup,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { connect } from "react-redux";
import { createNewCat } from "../actions/catActions";

function CatForm(props) {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [clicks, setClicks] = useState(0);
  const [image, setImage] = useState("source.unsplash.com/13ky5Ycf0ts/640x960");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const onChangeName = (e) => setName(e.target.value);
  const onChangeNickName = (e) => setNickName(e.target.value);
  const onChangeClicks = (e) => setClicks(e.target.value);
  const onChangeImage = (e) => setImage(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }

    if (clicks <= 0 || isNaN(clicks)) {
      return false;
    }
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    if (!urlRegex.test(image)) {
      return false;
    }
    setValidated(true);

    const newCat = {
      name,
      nickName,
      clicks,
      image: `https://${image}`,
    };

    props.createNewCat(newCat);
    setName("");
    setNickName("");
    setClicks(0);
    setImage("");
  };

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => handleSubmit(e)}
        className="form"
      >
        <h5 className="ml-3 mb-3 mt-3">Add new cat</h5>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Cat name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Cat name"
            defaultValue={name}
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
            defaultValue={nickName}
            onChange={(e) => onChangeNickName(e)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="validationCustom05">
          <Form.Label>Cat Clicks</Form.Label>
          <Form.Control
            type="text"
            placeholder="Clicks"
            onChange={(e) => onChangeClicks(e)}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustomURL">
          <Form.Label>Cat Image</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">https://</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Image URL"
              defaultValue={image}
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => onChangeImage(e)}
              onFocus={() => setShow(!show)}
              ref={target}
            />
            <Overlay target={target.current} show={show} placement="bottom">
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
        {name && nickName && clicks && image ? (
          <Form.Group as={Col} md="12">
            <Button className="save-button" type="submit" active>
              Save
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
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    catInformation: state.catInformation,
  };
};

export default connect(mapStateToProps, { createNewCat })(CatForm);
