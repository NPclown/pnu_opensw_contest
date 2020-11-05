import React, {useState,useEffect} from 'react';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';

function TestCaseModal(props) {
    const [inputList, setInputList] = useState([{ input: "", output:""}]);

    // handle input change
    const handleInputChange = (e, index) => {
        e.preventDefault()
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      props.setTestCase(inputList)
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
      props.setTestCase(list)
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { input: "",output:""}]);
    };
  
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
                    name="input"
                    placeholder="Parameter(int a int b)"
                    value={x.firstName}
                    onChange={e => handleInputChange(e, i)}
                />
                <input
                    className="ml10"
                    name="output"
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
        <Button variant="secondary" onClick={()=>props.handleClose(false)} >Close</Button>
      </Modal.Footer>
      </Modal>
      </div>
    )
}
export default TestCaseModal;

