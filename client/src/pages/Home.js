import React, {useState,useEffect} from 'react';
import '../assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';
import TestCaseModal from './TestCaseModal';
import ProblemCode from './ProblemCode';
import TestcaseResult from './TestcaseResult';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Problem from './Problem';
import ProblemResult from './ProblemResult';
import ProblemTitle from '../component/ProblemTitle'
import ProblemLanguage from '../component/ProblemLanguage'
import Axios from 'axios';

function Home(props) {

    const [show, setShow] = useState(false);
    const [go,setGo] = useState(true)
    const [id,setId] = useState("1")
    const [code,setCode] = useState("")
    const [testcase,setTestCase] = useState()
    const [language,setLanguage] = useState({name:"c",value:1})
    const [result,setResult] = useState({data:{}, isLoading:true})
    const [resultT,setResultT] = useState({data:{}, isLoading:true})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state,setState]=useState({data:{}, isLoading:true})

  useEffect(() => {
      const getData = async() => {
          try{
              var result = await Axios.get(`/api/workbooks/1`);
              setState({data : result.data.data.items, isLoading:false})
              setCode(result.data.data.items.inits[language.name])
          } catch(error) {
              alert(error)
              setState({data : {}, isLoading:true})
          }
      }
      getData();
  },[])


  const toBackEnd = async(e,id,language,code,testcase) => {
    e.preventDefault()
    var result3;
        try{
            result3 = await Axios.post(`/run/execution`,{id : id, 
                language:language.value, code:code, testcase:testcase});
            setResultT({data: result3.data.data.items, isLoading:false})
        } catch(error) {
            alert(error)
        }
        console.log(resultT)
    }
    const toBackEnd2 = async(e,id,language,code) => {
        e.preventDefault()
        var result2;
            try{
                result2 = await Axios.post(`/run/score`,{id : id, 
                    language:language.value, code:code});
                setResult({data: result2.data.data.items,isLoading:false})
            } catch(error) {
                alert(error)
            }
        }

    return state.isLoading ? (
      <div className="loading">
          <div>로딩중</div>
      </div>
      )  :
      (
      <div className="App">
      <div className="header">
        {state.data.name}
        <span className = "problem-number">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="outline-dark" onClick={()=>setId(1)}>1</Button> <Button variant="outline-dark" onClick={()=>setId(2)}>2</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </span>
        <ProblemLanguage language={language} setLanguage={setLanguage}></ProblemLanguage>
      </div>

      <div className="main-section" >
        <SplitPane split="vertical" height="80%" defaultSize={350}  minSize={50}>
          <div className= "problem">
            <ProblemTitle main={"문제 설명"}></ProblemTitle>
            <Problem cont={state.data.cont}></Problem>
          </div>
        <SplitPane  split="horizontal" defaultSize={350} minSize={350} >
        <ProblemCode inits={state.data.inits[language.name]} setGo={setGo} go={go} code={code} setCode={(value)=>setCode(value)}></ProblemCode>          
        <div className="codestyle problem-scroll2">
              소스결과
              {result.isLoading?(""):(<ProblemResult result={result}></ProblemResult>)}
              {resultT.isLoading?(""):(<TestcaseResult result={resultT}></TestcaseResult>)}
        </div>
        </SplitPane>
        </SplitPane>
      </div>

    <div className="footer">
      <div className="addtestcase">
      <Button variant="secondary" onClick={()=>handleShow(true)}>
        테스트 케이스 추가하기
      </Button>
      <Button variant="secondary" onClick={e => {toBackEnd(e,id,language,code,testcase); alert("테스트케이스")}}>
        테스트케이스 실행
      </Button>
      <Button className="send" variant="secondary" onClick={e => {toBackEnd2(e,id,language,code); alert("제출완료")}}>
        채점 및 제출        
      </Button>
      </div>
      <TestCaseModal show={show} handleClose={handleClose} handleShow={handleShow} setTestCase={setTestCase}>
      </TestCaseModal>
      </div>
    </div>
      
  );
}
export default Home;


