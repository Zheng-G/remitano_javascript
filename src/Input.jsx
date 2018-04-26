import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './Input.css';

class Input extends Component {
  state = {
    editing: false,
    baconIsReady: true
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleBaconChange = () => {
    this.setState({
      baconIsReady: !this.state.baconIsReady
    })
  }

  renderInput = () => {
    const value = this.props.value || '';
    const displayedUnit = this.props.displayedUnit || '';
    if (typeof this.props.value === 'string' || typeof this.props.value === 'undefined') {
      if (this.state.editing) {
        return (<InputGroup>
                <FormControl
                  type="text"
                  name={this.props.name}
                  defaultValue={this.props.value}
                  placeholder="Username"
                />
                <InputGroup.Addon id="basic-addon1">{this.props.unit}</InputGroup.Addon>
              </InputGroup>)
      }
      return <span><strong>{`${value} ${displayedUnit}`}</strong></span>;
    } else if (this.props.customElement) {
      if (this.state.editing) {
        return <Toggle
          defaultChecked={this.state.baconIsReady}
          icons={{
            checked: 'Có',
            unchecked: 'Không',
          }}
          onChange={this.handleBaconChange} />
      }
      return <span><strong>{`${value[0]} ${displayedUnit}`}</strong></span>;
    } else if (this.props.unit) {
      if (this.state.editing) {
        return (<InputGroup>
                <FormGroup controlId="formControlsSelect" >
                  <FormControl
                    className="btn btn-default"
                    bsSize="lg"
                    componentClass="select"
                    placeholder="select"
                  >
                    {this.props.value.map((value, i) => <option value={value} key={i}>{value}</option> )}
                  </FormControl>
                </FormGroup>
                <InputGroup.Addon id="basic-addon1">{this.props.unit}</InputGroup.Addon>
              </InputGroup>)
      } else {
        return <span>
                <span><strong>{`${value[0]} `}</strong></span><span>{`${displayedUnit}`}</span>
              </span>
      }
    } else {
      if (this.state.editing) {
        return <FormGroup controlId="formControlsSelect" >
                  <FormControl
                    className="btn btn-default"
                    bsSize="lg"
                    componentClass="select"
                    placeholder="select"
                  >
                    {this.props.value.map((value, i) => <option value={value} key={i}>{value}</option> )}
                  </FormControl>
                </FormGroup>
      } else {
        return <span><strong>{`${value[0]} ${displayedUnit}`}</strong></span>
      }
    }
  }

  render() {
    return (
      <Row className="mb-3">
        <Col xs={3}>{this.props.title}</Col>
        <Col xs={3}>{this.renderInput()}</Col>
        <Col xs={1} className="change" onClick={this.toggleEdit}>Thay đổi</Col>
        <Col xs={5} className="explanation">{this.props.description}</Col>
      </Row>
    );
  }
}

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  description: PropTypes.string
};

export default Input;