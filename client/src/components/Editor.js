import React ,{useState, useEffect} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTools, faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
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
import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, FormControl, Select} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Editor (props){
  const [id,setId] = useState(props.id)
  const [code,setCode] = useState("")
  const [language,setLanguage] = useState({name:"c",value:1})
  const [testcase,setTestCase] = useState([])
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [show, setShow] = useState(false);

  const classes = useStyles();

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
      console.log(tmp.data.data.items)
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
        <Button size="small" variant="outlined" onClick = {e => {setCode(props.data.inits[language.name]);alert("초기화"); props.setResult({data: {},isLoading:true}); props.setResultT({data: {},isLoading:true})}}>
          <FontAwesomeIcon icon={faUpload} /> reset
        </Button>
        <Spacer></Spacer>
        <Button variant="outlined" onClick = {() => setShow(true)}>
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
        <Button onClick={() => setIsRegisterOpen(true)}><FontAwesomeIcon  icon={faTools} /> Settings</Button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
          <DialogTitle>Language</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={radioValue}
                  onChange={(e)=>{setLanguage({name:radios[e.target.value-1].name ,
                  value:radios[e.target.value-1].value});setRadioValue(e.target.value)}}
                  input={<Input id="demo-dialog-native" />}
                >
                {radios.map((item,index) =>(
                        <option name={item.name} value={item.value} key={index}>
                          {item.name}
                          </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRegisterOpen(false)} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
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
