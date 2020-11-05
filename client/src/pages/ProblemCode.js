import React, {useState,useEffect} from 'react';
import '../assets/problemcode.css'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/lucario.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import 'codemirror/keymap/sublime'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/xml/xml';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';

const ProblemCode = (props) =>{
    
    return(
        <div className="problemcode">
            <div className="codestyle">
              소스코드
              <Button variant="secondary" size="sm" className="reset-button" 
                onClick = {e => {props.setCode(props.inits);alert("초기화")}}>
                    초기화
                </Button>
            </div>
            <CodeMirror
                value={props.code}
                onChange={(editor,data,value)=>{
                    props.setCode(value.replace(/\n/ig, '\n'))
                }}
                options={{
                theme: 'lucario',
                tabSize: 2,
                lineNumbers:true,
                mode: 'python',
                keyMap: 'sublime',                
            }}
            >
            </CodeMirror>
        </div>
    )
}
export default ProblemCode;

