import React ,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faCheck } from '@fortawesome/free-solid-svg-icons';
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

function AddInitEd (props){
  const [code,setCode] = useState(props.init)
  const [language,setLanguage] = useState({name:"c",value:1})
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const classes = useStyles();

  const radios = [
    { name: 'c', value: 1 },
    { name: 'cpp', value: 2 },
    { name: 'python', value: 3 },
    { name: 'python3', value: 4 },
  ];
  const [radioValue, setRadioValue] = useState(1);
  const type ={'c': "text/x-csrc", 'cpp': "text/x-c++src", 'python': "python", 'python3': "python"}

  const handleClick = (e) => {
    e.preventDefault()
    props.setInit(code)
    const tmp = [...props.complete];
    tmp[2].state = true;
    props.setComplete(tmp)
    alert("저장 완료!")
  }
  useEffect(() => {
  },[language])

  return (
    <div className="editor-area">
      <div className="editor-menu">
        <Spacer></Spacer>
      </div>
      
      <CodeMirror
        value={code[language.value-1].code}
        onChange={(editor,data,value)=>{
            const tmp = [...code];
            tmp[language.value-1].code = value.replace(/\n/ig, '\n');
            console.log(tmp)
            setCode(tmp)
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
        <Button onClick= {(e) => {handleClick(e)}}>
          <FontAwesomeIcon icon={faCheck} /> 저장
        </Button>
      </div>
    </div>
  );
}
export default AddInitEd;
