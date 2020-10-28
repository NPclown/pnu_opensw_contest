import React, {useState,useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const ProblemLanguage = (props) =>{
    return(
    <div>
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
    )
}
export default ProblemLanguage;