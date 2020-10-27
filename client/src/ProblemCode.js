import React, {useState,useEffect} from 'react';
import './assets/problemcode.css'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

function ProblemCode() {
    const code = 'const a = 0;'
    const height = '300px'
    return(
        <div className="problemcode">
            <CodeMirror
            value={code}
            height={height}
            options={{
                theme: 'monokai',
                tabSize: 2,
                keyMap: 'sublime',
                mode: 'jsx',
            }}/>
        </div>
    )
}
export default ProblemCode;