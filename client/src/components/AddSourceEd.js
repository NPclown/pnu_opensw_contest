import React ,{useState, useEffect} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTools, faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Label, Input } from 'reactstrap';
import Spacer from './Spacer';
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
import '../components/Editor.css'
import TestCaseModal from './TestCaseModal'

function AddSourceEd (props){
  const [code,setCode] = useState({c : "", cpp : "", python : "", python3 : ""})
  const [language,setLanguage] = useState({name:"c",value:1})
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const radios = [
    { name: 'c', value: 1 },
    { name: 'cpp', value: 2 },
    { name: 'python', value: 3 },
    { name: 'python3', value: 4 },
  ];
  const [radioValue, setRadioValue] = useState(1);
  const type ={'c': "text/x-csrc", 'cpp': "text/x-c++src", 'python': "python", 'python3': "python"}

  return (
    <div className="editor-area">
      <div className="editor-menu">
        <Spacer></Spacer>
      </div>
      
      <CodeMirror
        value={code[language.name]}
        onChange={(editor,data,value)=>{
            setCode(value.replace(/\n/ig, '\n'))
        }}
        autoCursor={false}
        options={{
        theme: 'lucario',
        tabSize: 2,
        lineNumbers:true,
        mode: type[language.name],
        keyMap: 'sublime',                
      }}
      >
      </CodeMirror>

      <div className="editor-menu">
        <ButtonDropdown isOpen={isRegisterOpen} toggle={() => setIsRegisterOpen(!isRegisterOpen)} direction="up">
          <DropdownToggle>
            <FontAwesomeIcon  icon={faTools} /> Settings
          </DropdownToggle>
          <DropdownMenu className="p-4">
              <Form style={{ width: 300 }}>
                <FormGroup className="form-row">
                  <Label className="col-4 font-weight-bold" for="language-select">Language</Label>
                  <Spacer width={6} />
                  <Input
                    className="col"
                    bsSize="sm"
                    type="select"
                    id="language-select"
                    onChange = {(e)=>{setLanguage({name:radios[e.target.value-1].name ,
                        value:radios[e.target.value-1].value});setRadioValue(e.target.value)}}
                    >
                    {radios.map((item,value) =>(
                      <option name={item.name} value={item.value} select={`"${radioValue === item.value}"`}>
                        {item.name}
                        </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
          </DropdownMenu>
        </ButtonDropdown>
        <Spacer/>
        <Button >
          <FontAwesomeIcon icon={faCheck} /> 저장
        </Button>
      </div>
    </div>
  );
}
export default AddSourceEd;
