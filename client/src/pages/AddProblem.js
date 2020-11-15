import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab, Typography, Box} from '@material-ui/core';
import 'codemirror/lib/codemirror.css';
import AddEditor from '../components/AddEditor'
import AddInitEd from '../components/AddInitEd'
import AddCodeEd from '../components/AddCodeEd'
import AddHeaderEd from '../components/AddHeaderEd'
import AddAll from '../components/AddAll'
import Axios from 'axios';

function TabPanel(props) {
  const { children, value, index, boxClass, typoClass, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={boxClass} p={3}>
          <Typography className={typoClass}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  TabPanel : {
    width : '100%',
    height : '100%'
  },
  Box : {
    height : '100%'
  },
  Typo : {
    height : '100%'
  }
}));



export default function AddProblem(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [complete, setComplete] = useState([{state:false},{state:false},{state:false},{state:false},{state:false}])
  const [title,setTitle] =useState("")
  const [schema,setSchema] =useState("")
  const [cont,setCont] =useState('<h3 data-tomark-pass="">문제 설명\n' +
  '</h3>단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.\n' +
  '<h3 data-tomark-pass="">제한사항\n' +
  '</h3><ul data-tomark-pass=""><li data-tomark-pass="">s는 길이가 1이상, 100이하인 스트링입니다.</li></ul><h3 data-tomark-pass="">입출력 예\n' +
  '</h3><table data-tomark-pass=""><thead data-tomark-pass=""><tr data-tomark-pass=""><th data-tomark-pass="">s</th><th data-tomark-pass="">return</th></tr></thead><tbody data-tomark-pass=""><tr data-tomark-pass=""><td data-tomark-pass="">"abcde"</td><td data-tomark-pass="">"c"</td></tr><tr data-tomark-pass=""><td data-tomark-pass="">"qwer"</td><td data-tomark-pass="">"we"</td></tr></tbody></table>\n')
  const [testcase,setTestcase] =useState([{input : "", output : ""}])
  const [main,setMain] =useState([{code : "//c\n#include <stdio.h>\n#include <string.h>\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    char* result;\n    char input[100];\n    char output[100];\n\n    FILE* fin = fopen(argv[1], \"r\");\n    FILE* fout = fopen(argv[2], \"r\");\n    FILE* fr = fopen(argv[3], \"w\");\n\n    fgets(input, sizeof(input), fin);\n    fgets(output, sizeof(output), fout);\n\n    result = solution(input);\n\n    fprintf(fr,\"\\\"%s\\\"\\n\",input);\n    fprintf(fr,\"\\\"%s\\\"\\n\",output);\n\n    if(!strcmp(result,output)){\n        fprintf(fr,\"테스트를 통과하였습니다.\\n\");\n    }else{\n        fprintf(fr,\"실행한 결괏값 \\\"%s\\\"이(가) 기댓값 \\\"%s\\\"와(과) 다릅니다.\\n\", result, output);\n    }\n\n    return 0;\n}"},{code : "//cpp\n#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    string result;\n    string a, b;\n\n    ifstream fin(argv[1]);\n    ifstream fout(argv[2]);\n    ofstream fr(argv[3]);\n\n    fin >> a;\n    fout >> b;\n\n    result = solution(a);\n\n    fr <<\"\\\"\"<< a <<\"\\\"\"<< endl;\n    fr <<\"\\\"\"<< b <<\"\\\"\"<< endl;\n\n    if(result == b){\n        fr << \"테스트를 통과하였습니다.\" << endl;\n    }else{\n        fr << \"실행한 결괏값 \\\"\"<< result << \"\\\"이(가) 기댓값 \\\"\" << b << \"\\\"와(과) 다릅니다.\" << endl;\n    }\n\n    fin.close();\n    fout.close();\n    fr.close();\n\n    return 0;\n}"},{code : "#python2\n# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\na = fin.read()\nb = fout.read()\n\nresult = solution(a)\n\nfr.write('\"{0}\"\\n'.format(a))\nfr.write('\"{0}\"\\n'.format(b))\n\nif(result == b):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 \"{0}\"이(가) 기댓값 \"{1}\"와(과) 다릅니다.\\n'.format(a,b))\nfr.close()"},{code : "#python3\n# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\na = fin.read()\nb = fout.read()\n\nresult = solution(a)\n\nfr.write('\"{0}\"\\n'.format(a))\nfr.write('\"{0}\"\\n'.format(b))\n\nif(result == b):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 \"{0}\"이(가) 기댓값 \"{1}\"와(과) 다릅니다.\\n'.format(a,b))\nfr.close()"}])
  const [header, setHeader] = useState([{code:"//c\nchar* solution(const char* s);"},{code : "//cpp\nstring solution(string s);"}])
  const [init,setInit] =useState([{code : "//c\n#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\n// 파라미터로 주어지는 문자열은 const로 주어집니다. 변경하려면 문자열을 복사해서 사용하세요.\nchar* solution(const char* s) {\n    // return 값은 malloc 등 동적 할당을 사용해주세요. 할당 길이는 상황에 맞게 변경해주세요.\n    char* answer = (char*)malloc(1);\n    return answer;\n}"},{code : "//cpp\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nstring solution(string s) {\n    string answer = \"\";\n    return answer;\n}"},{code : "#python2\ndef solution(s):\n    answer = \'\' \n    return answer"},{code : "#python3\ndef solution(s):\n    answer = \'\' \n    return answer"}])
  const [score,setScore] =useState([{input : "", output : ""}])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toBackendAdd = async(e) => {
    e.preventDefault()
        try{
            var check = 0
            complete.map((item) => {
              if (item.state === false){
                check += 1
              }
            })
            if (check === 0){
            console.log(init[0].code)
            var result2 = await Axios.post(`/api/workbooks`,{
              name:title, 
              cont:cont,
              inits:{
                c : init[0].code,
                cpp : init[1].code,
                python : init[2].code,
                python3 : init[3].code
              }, 
              code: { 
                main : {
                  c : main[0].code,
                  cpp : main[1].code,
                  python : main[2].code,
                  python3 : main[3].code
                }, 
                header : {
                  c : header[0].code,
                  cpp : header[0].code
                } 
              }, 
              score: score,
              sample: {
                testcase : testcase,
                schema: schema 
              }
            });
            alert("제출완료");
            if(result2.data.code === 0){
              alert("등록에 성공하였습니다!")
            }else{
              alert("등록에 실패하였습니다!")
            }
          }else{
            alert("항목을 모두 작성하여 주세요.")
          }
        } catch(error) {
            alert(error)
        }
    }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label={complete[0].state ? "문제이름 o" : "문제이름"} {...a11yProps(0)} />
        <Tab label={complete[1].state ? "문제내용 o" : "문제내용"} {...a11yProps(1)} />
        <Tab label={complete[2].state ? "문제 초기코드 o" : "문제 초기코드"} {...a11yProps(2)} />
        <Tab label={complete[3].state ? "채점 코드 o" : "채점 코드"} {...a11yProps(3)} />
        <Tab label={complete[4].state ? "채점 해더코드 o" : "채점 해더코드"} {...a11yProps(4)} />
        <Tab label="제출하기" onClick ={(e)=>{toBackendAdd(e)}}{...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddAll title={title} schema={schema} setSchema={setSchema} complete={complete} setComplete={setComplete} testcase={testcase} setTestcase={setTestcase} setTitle={setTitle} score={score} setScore={setScore}></AddAll>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddEditor complete={complete} setComplete={setComplete} setCont={setCont} cont={cont} placeholder= '문제를 작성해 주세요.'></AddEditor>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.TabPanel} boxClass={classes.Box} typoClass={classes.Typo}>
        <AddInitEd complete={complete} setComplete={setComplete} init={init} setInit={setInit}></AddInitEd>
      </TabPanel>
      <TabPanel value={value} index={3} complete={complete} setComplete={setComplete} className={classes.TabPanel} boxClass={classes.Box} typoClass={classes.Typo}>
        <AddCodeEd complete={complete} setComplete={setComplete} main={main} setMain={setMain}></AddCodeEd>
      </TabPanel>
      <TabPanel value={value} index={4} complete={complete} setComplete={setComplete} className={classes.TabPanel} boxClass={classes.Box} typoClass={classes.Typo}>
        <AddHeaderEd complete={complete} setComplete={setComplete} header={header} setHeader={setHeader}></AddHeaderEd>
      </TabPanel>
      <TabPanel index={5}>
        제출이 완료되었습니다.
      </TabPanel>
    </div>
  );
}
