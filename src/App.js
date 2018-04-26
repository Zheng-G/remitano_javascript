import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';

import Main from './Main';

class App extends Component {
  render() {
    return (
      <Grid className="my-5 wrapper">
        <Row className="pb-4">
          <Col xs={12}>
            <Main />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
