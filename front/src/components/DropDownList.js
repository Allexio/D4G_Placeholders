import React from 'react';
import {
  Form,
} from 'react-bootstrap';

const DropDownList = ({
  label = '',
  options = [],
  onSelect = () => {},
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        className="browser-default custom-select"
        onSelect={onSelect}
      >
      {
        options.map(({ value }) => (
          <option value={value}>
            {value}
          </option>
        ))
      }
      </Form.Control>
    </Form.Group>
  )
};

export default DropDownList;
