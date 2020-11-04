import React from 'react';
import DropDownList from './DropDownList';
import {
  Col,
  Form,
  Row,
} from 'react-bootstrap';

const options = [
  {
    value: "Paris"
  },
  {
    value: "Marseille"
  }
];

const Search = () => {
  return (
    <Row>
      <Col md={8}>
        <Form.Label>Postal code</Form.Label>
        <Form.Control type="text" placeholder="Postal code"/>
      </Col>
      <Col md={6}>
        <DropDownList
          label="City"
          options={options}
        />
      </Col>
      <Col md={6}>
        <DropDownList
          label="Department"
          options={options}
        />
      </Col>
    </Row>
  );
};

export default Search;
