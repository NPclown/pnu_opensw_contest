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
import ReactDom from 'react-dom';
import Axios from 'axios'
import 'codemirror/mode/xml/xml';

const ProblemCode = (props) =>{
                                                                    
    return(
        <div className="problemcode">
            <CodeMirror
                value={props.inits}
                onChange={(editor,data,value)=>{
                    props.setCode(value)
                }}
                options={{
                theme: 'lucario',
                tabSize: 2,
                lineNumbers:true,
                mode: 'python',
                keyMap: 'sublime',                
            }}
            />
        </div>
    )
}
export default ProblemCode;

