import React, {useState,useEffect} from 'react';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';

function TestCaseModal(props) {
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
    return(
        <div className="TestCaseModal">
            <Modal show={props.show} onHide={props.handleClose}>
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
                    {inputList.length - 1 === i && <Button variant="outline-success" size ='sm' onClick={handleAddClick}>Add</Button>}
                </div>
            );
            })}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="primary" onClick={e => handleAddClick(e)}>Add</Button> */}
        <Button variant="secondary" onClick={props.handleClose} >Close</Button>
      </Modal.Footer>
      </Modal>
      </div>
    )
}
export default TestCaseModal;