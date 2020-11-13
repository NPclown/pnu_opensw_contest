import React ,{useState, useEffect} from 'react';
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

function AddCodeEd (props){
  const [code,setCode] = useState([{code : "//c\n#include <stdio.h>\n#include <string.h>\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    char* result;\n    char input[100];\n    char output[100];\n\n    FILE* fin = fopen(argv[1], \"r\");\n    FILE* fout = fopen(argv[2], \"r\");\n    FILE* fr = fopen(argv[3], \"w\");\n\n    fgets(input, sizeof(input), fin);\n    fgets(output, sizeof(output), fout);\n\n    result = solution(input);\n\n    fprintf(fr,\"\\\"%s\\\"\\n\",input);\n    fprintf(fr,\"\\\"%s\\\"\\n\",output);\n\n    if(!strcmp(result,output)){\n        fprintf(fr,\"테스트를 통과하였습니다.\\n\");\n    }else{\n        fprintf(fr,\"실행한 결괏값 \\\"%s\\\"이(가) 기댓값 \\\"%s\\\"와(과) 다릅니다.\\n\", result, output);\n    }\n\n    return 0;\n}"},{code : "//cpp\n#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    string result;\n    string a, b;\n\n    ifstream fin(argv[1]);\n    ifstream fout(argv[2]);\n    ofstream fr(argv[3]);\n\n    fin >> a;\n    fout >> b;\n\n    result = solution(a);\n\n    fr <<\"\\\"\"<< a <<\"\\\"\"<< endl;\n    fr <<\"\\\"\"<< b <<\"\\\"\"<< endl;\n\n    if(result == b){\n        fr << \"테스트를 통과하였습니다.\" << endl;\n    }else{\n        fr << \"실행한 결괏값 \\\"\"<< result << \"\\\"이(가) 기댓값 \\\"\" << b << \"\\\"와(과) 다릅니다.\" << endl;\n    }\n\n    fin.close();\n    fout.close();\n    fr.close();\n\n    return 0;\n}"},{code : "#python2\n# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\na = fin.read()\nb = fout.read()\n\nresult = solution(a)\n\nfr.write('\"{0}\"\\n'.format(a))\nfr.write('\"{0}\"\\n'.format(b))\n\nif(result == b):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 \"{0}\"이(가) 기댓값 \"{1}\"와(과) 다릅니다.\\n'.format(a,b))\nfr.close()"},{code : "#python3\n# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\na = fin.read()\nb = fout.read()\n\nresult = solution(a)\n\nfr.write('\"{0}\"\\n'.format(a))\nfr.write('\"{0}\"\\n'.format(b))\n\nif(result == b):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 \"{0}\"이(가) 기댓값 \"{1}\"와(과) 다릅니다.\\n'.format(a,b))\nfr.close()"}])
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

  const handleClick = (e) => {
    e.preventDefault()
    props.setCode({
      main : {
        c : code[0].code,
        cpp : code[1].code,
        python : code[2].code,
        python3 : code[3].code
      },
      header : {
        c: "char* solution(const char* s);",
        cpp: "string solution(string s);"
      }
    })
    alert("저장 완료!")
  }
  useEffect(() => {
    console.log(language)
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
                    value={radioValue}
                    >
                    {radios.map((item,value) =>(
                      <option name={item.name} value={item.value}>
                        {item.name}
                        </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
          </DropdownMenu>
        </ButtonDropdown>
        <Spacer/>
        <Button onClick= {(e) => {handleClick(e)}}>
          <FontAwesomeIcon icon={faCheck} /> 저장
        </Button>
      </div>
    </div>
  );
}
export default AddCodeEd;
