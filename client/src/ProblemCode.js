import React, {useState,useEffect} from 'react';
import './assets/problemcode.css'
// import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import 'codemirror/lib/codemirror.css'
import ReactDom from 'react-dom';

const ProblemCode = (props) =>{
    const height = '300px'

    // if(props.go){
    //     <CodeMirror
    //     value='hello'
    //     height={height}
    //     options={{
    //         theme: 'monokai',
    //         tabSize: 2,
    //         keyMap: 'sublime',
    //         mode: 'jsx',
    //     }}/>
    // } //초기화 버튼 눌렀을 시
    
    return(
        <div className="problemcode">
            <CodeMirror
            value={props.code}
                height={height}
                onChange={(editor,data,value)=>{
                    props.setCode(value)
                }}
                options={{
                theme: 'monokai',
                tabSize: 2,
                lineNumbers:true,
                mode: 'jsx',
                
            }}
            />
        </div>
    )
}
export default ProblemCode;

