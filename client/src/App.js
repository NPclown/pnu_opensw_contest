import React, {useState,useEffect} from 'react';
import '../src/assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';

function App() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "", returnName:""}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" ,returnName:""}]);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const registerComment = async(e) => {
    var result;

    }

  return (
    <div App>
      <div className="header">
        헤더라인
      </div>

      <div className="main-section" >
        <SplitPane split="vertical" height="80%" defaultSize={200}  minSize={50}>
          <div className= "problem">
            문제라인
          </div>
        <SplitPane  split="horizontal" defaultSize={200} minSize={50} >
          <div>소스코드</div>
          <div>소스결과</div>
        </SplitPane>
        </SplitPane>
      </div>

    <div className="footer">
      <Button variant="primary" onClick={handleShow}>
        테스트 케이스 추가하기
      </Button>
    </div>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          테스트 케이스 추가
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
      {inputList.map((x, i) => {
      return (
        <div className="box">
          <input
            name="firstName"
            placeholder="Parameter(int a)"
            value={x.firstName}
            onChange={e => handleInputChange(e, i)}
          />
          <input
            className="ml10"
            name="lastName"
            placeholder="Parameter(int b)"
            value={x.lastName}
            onChange={e => handleInputChange(e, i)}
          />
         <input
            className="ml10"
            name="returnName"
            placeholder="Output"
            value={x.returnName}
            onChange={e => handleInputChange(e, i)}
          />

            {inputList.length !== 1 && <Button
              className="mr10"
              variant="outline-danger"
              size = 'sm'
              onClick={() => handleRemoveClick(i)}>Remove</Button>}
            {/* {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>} */}
        </div>
      );
    })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={e => handleAddClick(e)}>Add</Button>
        <Button variant="secondary" onClick={handleClose} >Close</Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;


