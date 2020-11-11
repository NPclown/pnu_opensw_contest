import React ,{useState, useEffect} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Label, Input } from 'reactstrap';
import Spacer from './Spacer';
import '../assets/problemcode.css'
import AceContext from '../context/AceContext';
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

function Editor (props){
  const [id,setId] = useState(props.id)
  const [code,setCode] = useState("")
  const [language,setLanguage] = useState({name:"c",value:1})
  const [testcase,setTestCase] = useState([])
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setCode(props.data.inits[language.name])
  },[language])

  const radios = [
    { name: 'c', value: 1 },
    { name: 'cpp', value: 2 },
    { name: 'python', value: 3 },
    { name: 'python3', value: 4 },
  ];
  const [radioValue, setRadioValue] = useState(1);
  const type ={'c': "text/x-csrc", 'cpp': "text/x-c++src", 'python': "python", 'python3': "python"}

  const toBackEnd = async(e) => {
    e.preventDefault()
    try{
      var tmp = await Axios.post(`/run/execution`,{id : id, language:language.value, code:code, testcase:testcase});
      props.setResultT({data: tmp.data.data.items, isLoading:false})
    } catch(error) {
      alert(error)
    }
  }

  const toBackEnd2 = async(e) => {
    e.preventDefault()
    try{
      var tmp = await Axios.post(`/run/score`,{id : id, language:language.value, code:code});
      props.setResult({data: tmp.data.data.items,isLoading:false})
    } catch(error) {
      alert(error)
    }
  }

  return (
    <div className="editor-area">
      <div className="editor-menu">
        <Button onClick = {e => {setCode(props.data.inits[language.name]);alert("초기화"); props.setResult({data: {},isLoading:true}); props.setResultT({data: {},isLoading:true})}}>
          <FontAwesomeIcon icon={faUpload} /> reset
        </Button>
        <Spacer></Spacer>
        <Button onClick = {() => setShow(true)}>
          <FontAwesomeIcon icon={faUpload} /> testcase
        </Button>
        <TestCaseModal {...props} show={show} setShow={setShow} testcase={testcase} setTestCase={setTestCase}>
        </TestCaseModal>
      </div>

      <CodeMirror
        value={code}
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
                      onChange = {(e)=>{setLanguage({name:radios[e.target.value-1].name ,
                          value:radios[e.target.value-1].value});setRadioValue(e.target.value)}}
                      >
                      {radios.map((item,value) =>(
                        <option name={item.name} value={item.value} selected={radioValue == item.value}>
                          {item.name}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Form>
              }
            </AceContext.Consumer>
          </DropdownMenu>
        </ButtonDropdown>
        <Spacer/>
        <Button onClick={e => {props.setResultT({data: {},isLoading:true}); props.setResult({data: {},isLoading:true}); toBackEnd2(e); alert("제출완료");}}>
          <FontAwesomeIcon icon={faPlay} /> Run and Submit
        </Button>
        <Button onClick={e => {props.setResult({data: {},isLoading:true}); props.setResultT({data: {},isLoading:true}); toBackEnd(e); alert("테스트케이스");}}>
          <FontAwesomeIcon icon={faCheck} /> Test
        </Button>
      </div>
    </div>
  );
}

export default Editor;
