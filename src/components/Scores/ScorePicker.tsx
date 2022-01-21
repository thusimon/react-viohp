import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import ScoreList from './ScoreList';

const ScorePicker  = () => {
  return (
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <Row>
        <Col sm={3}>
          <Nav variant='pills' className='flex-column'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Public</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Private</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <ScoreList category='public' reqPath='/api/scores/public'/>
            </Tab.Pane>
            <Tab.Pane eventKey='second'>
              <ScoreList category='private' reqPath='/api/scores/me'/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ScorePicker;
