
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
                <Dropdown.Item onClick={()=>props.setLanguage("c")}>C언어</Dropdown.Item>
                <Dropdown.Item onClick={()=>props.setLanguage("p")}>Python</Dropdown.Item>
                <Dropdown.Item onClick={()=>props.setLanguage("j")}>Java</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
    )
}
export default ProblemLanguage;
