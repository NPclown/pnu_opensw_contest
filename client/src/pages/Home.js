import React, {useState,useEffect} from 'react';
import '../assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';
import TestCaseModal from './TestCaseModal';
import ProblemCode from './ProblemCode';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import Problem from './Problem';
import ProblemResult from './ProblemResult';
import ProblemTitle from '../component/ProblemTitle'
import ProblemLanguage from '../component/ProblemLanguage'
import Axios from 'axios';

function Home(props) {

  const [state,setState]=useState({data:{}, isLoading:true})
  useEffect(() => {
      const getData = async() => {
          try{
              var result = await Axios.get(`/api/workbooks/1`);
              setState({data : result.data.data.items, isLoading:false})
          } catch(error) {
              alert(error)
              setState({data : {}, isLoading:true})
          }
      }
      getData();
  },[])

  const [show, setShow] = useState(false);
  const [go,setGo] = useState(true)
  const [id,setId] = useState("")
  const [code,setCode] = useState("")
  const [testcase,setTestCase] = useState("")
  const [language,setLanguage] = useState("c")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toBackEnd = async(e,language,testcase,code,id) => {
    e.preventDefault()
    var result;
        try{
            result = await Axios.post(`/run/score`,{id : id, 
                language:language, code:code, testcase:testcase});
        } catch(error) {
            alert(error)
        }
    }

    console.log(code)

    return state.isLoading ? (
      <div className="loading">
          <div>로딩중</div>
      </div>
      )  :(
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
        <div className = "problem-language">
            <ProblemLanguage id={state.data.id} setLanguage={setLanguage}></ProblemLanguage>
        </div>
      </div>

      <div className="main-section" >
        <SplitPane split="vertical" height="80%" defaultSize={350}  minSize={50}>
          <div className= "problem">
            <ProblemTitle main={"문제 설명"}></ProblemTitle>
            <Problem cont={state.data.cont}></Problem>
          </div>
        <SplitPane  split="horizontal" defaultSize={350} minSize={350} >
        <ProblemCode inits={state.data.inits[language]} setGo={setGo} go={go} code={code} setCode={(value)=>setCode(value)} ></ProblemCode>          
        <ProblemResult></ProblemResult>
        </SplitPane>
        </SplitPane>
      </div>
    <div className="footer">
      <div className="addtestcase">
      <Button variant="secondary" onClick={()=>handleShow(true)}>
        테스트 케이스 추가하기
      </Button>
      <Button className="send" variant="secondary" onClick={e => {toBackEnd(e,id,code,testcase); alert("제출완료")}}>
        채점 및 제출 
      </Button>
      </div>

      <TestCaseModal show={show} handleClose={handleClose} handleShow={handleShow} 
       setTestCase={setTestCase}>
      </TestCaseModal>
      </div>

    </div>
      
  );
}
export default Home;


