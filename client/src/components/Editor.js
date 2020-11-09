import React ,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Label, Input } from 'reactstrap';
import Spacer from './Spacer';
import languages from '../js/languages';
import AceContext from '../context/AceContext';
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

function Editor (props){
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const radios = [
    { name: 'c', value: 1 },
    { name: 'cpp', value: 2 },
    { name: 'python', value: 3 },
    { name: 'python3', value: 4 },
  ];
  
 const type ={'c': "text/x-csrc", 'cpp': "text/x-c++src", 'python': "python", 'python3': "python"}
    return (
      <div className="editor-area">
        <div className="editor-menu">
          <Button onClick = {e => {props.setCode(props.inits);alert("초기화"); props.setResult({data: {},isLoading:true})
            ;props.setResultT({data: {},isLoading:true})}}>
            <FontAwesomeIcon icon={faUpload} /> reset
          </Button>
        </div>

        <CodeMirror
          value={props.code}
          onChange={(editor,data,value)=>{
              props.setCode(value.replace(/\n/ig, '\n'))
          }}
          autoCursor={false}
          options={{
          theme: 'lucario',
          tabSize: 2,
          lineNumbers:true,
          mode: type[props.language.name],
          keyMap: 'sublime',                
        }}
        >
        </CodeMirror>

        <div className="editor-menu">
          <ButtonDropdown isOpen={isRegisterOpen} toggle={() => setIsRegisterOpen(isRegisterOpen)} direction="up">
            <DropdownToggle>
              <FontAwesomeIcon icon={faTools} /> Settings
            </DropdownToggle>
            <DropdownMenu className="p-4">
              <AceContext.Consumer>
                {aceProps =>
                  <Form style={{ width: 300 }}>
                    <FormGroup className="form-row">
                      <Label className="col-4 font-weight-bold" for="language-select">Language</Label>
                      <Spacer width={6} />
                      <Input
                        className="col"
                        bsSize="sm"
                        type="select"
                        id="language-select"
                        value={radios}
                        onClick={()=>props.setLanguage({name:radios[1].name, value:radios[1].value})}>
                        {Object.entries(languages).map(([id, { name }]) =>
                          <option key={id} value={id}>{name}</option>
                        )}
                      </Input>
                    </FormGroup>
                    <FormGroup className="form-row">
                      <Label className="col-4 font-weight-bold" for="theme-select">Theme</Label>
                      <Spacer width={6} />
                      <Input
                        className="col"
                        bsSize="sm"
                        type="select"
                        id="theme-select"
                        value={aceProps.theme}
                        onChange={event => this.props.onAceChange({ theme: event.target.value })}>
                        <option value="monokai">Monokai</option>
                        <option value="dawn">Dawn</option>
                        <option value="textmate">Textmate</option>
                        <option value="solarized_light">Solarized Light</option>
                        <option value="solarized_dark">Solarized Dark</option>
                      </Input>
                    </FormGroup>
                  </Form>
                }
              </AceContext.Consumer>
            </DropdownMenu>
          </ButtonDropdown>
          <Spacer />
          <Button onClick={e => {props.setResultT({data: {},isLoading:true});props.toBackEnd2(e,props.id,props.language,props.code); 
            props.setResult({data: {},isLoading:true});alert("제출완료");}}>
            <FontAwesomeIcon icon={faPlay} /> Run and Submit
          </Button>
          <Button onClick={e => {props.setResult({data: {},isLoading:true});props.toBackEnd(e,props.id,props.language,props.code,props.testcase); 
            props.setResultT({data: {},isLoading:true});alert("테스트케이스");}}>
            <FontAwesomeIcon icon={faCheck} /> Test
          </Button>
        </div>
      </div>
    );
  }

export default Editor;
