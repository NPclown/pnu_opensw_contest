import React, {useState,useEffect} from 'react';
import '../src/assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';
import TestCaseModal from './TestCaseModal';
import ProblemCode from './ProblemCode';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  return (

    <div className="App">
      <div className="header">
        문제이름
        <span className = "problem-number">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button>1</Button> <Button>2</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </span>
        <div className = "problem-language">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              언어선택
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>C언어</Dropdown.Item>
              <Dropdown.Item>Python</Dropdown.Item>
              <Dropdown.Item>Java</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </div>
      </div>

      <div className="main-section" >
        <SplitPane split="vertical" height="80%" defaultSize={200}  minSize={50}>
          <div className= "problem">
          두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

제한 조건
a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.
a와 b의 대소관계는 정해져있지 않습니다.
          </div>
        <SplitPane  split="horizontal" defaultSize={330} minSize={330} >
          <div>소스코드
            <ProblemCode></ProblemCode>
          </div>
          <div>소스결과
          </div>
        </SplitPane>
        </SplitPane>
      </div>
    <div className="footer">
      <Button variant="primary" onClick={handleShow}>
        테스트 케이스 추가하기
      </Button>
    </div>
      <TestCaseModal show={show} handleClose={handleClose} handleShow={handleShow}></TestCaseModal>
    </div>
  );
}

export default App;


