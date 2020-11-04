import React, {useState,useEffect} from 'react';
import './assets/problemcode.css'
// import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/lucario.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import 'codemirror/lib/codemirror.css'
import ReactDom from 'react-dom';
import Axios from 'axios'
const ProblemCode = (props) =>{

    const height = "120px"
                                                                    
    return(
        <div className="problemcode">
            <CodeMirror
            value={props.inits}
                onChange={(editor,data,value)=>{
                    props.setCode(value)
                }}
                height={height}
                options={{
                theme: 'lucario',
                tabSize: 2,
                lineNumbers:true,
                mode: 'jsx',
                keyMap: 'sublime',                
            }}
            />
        </div>
    )
}
export default ProblemCode;

