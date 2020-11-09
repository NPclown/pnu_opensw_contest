import React, { useState,useEffect } from 'react';
import Split from 'react-split';
import { Spinner } from 'reactstrap';
import Problem from '../components/Problem';
import './WorkspacePage.css';
import Workspace from '../components/Workspace';
import Axios from 'axios';

  function WorkspacePage(props){
    const [code,setCode] = useState("")
    const [language,setLanguage] = useState({name:"c",value:1})
    const [id,setId] = useState("1")
    const [show, setShow] = useState(false);
    const [go,setGo] = useState(true)
    const [testcase,setTestCase] = useState()
    const [result,setResult] = useState({data:[], isLoading:true})
    const [resultT,setResultT] = useState({data:[], isLoading:true})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state,setState]=useState({data:{}, isLoading:true})

    useEffect(() => {
      const getData = async() => {
          try{
              var result = await Axios.get(`/api/workbooks/${props.match.params.id}`);
              setState({data : result.data.data.items, isLoading:false})
              setCode(result.data.data.items.inits[language.name])
          } catch(error) {
              alert(error)
              setState({data : {}, isLoading:true})
          }
      }
      getData();
  },[id,language])

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
      console.log(state.data.cont)
  return state.isLoading ? (
    <div className="d-flex h-100 align-items-center justify-content-center">
    <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
  </div>
    )  :
    (
      <Split
        direction="horizontal"
        sizes={[50, 50]}
        minSize={0}
        gutterSize={12}
        className="split-parent-horizontal"
      >
        <div className="problem-pane">
          <Problem cont={state.data.cont} />
        </div>
        <Workspace
          result={result}
          resultT={resultT}
          language={language} setLanguage={setLanguage}
          inits={state.data.inits[language.name]}
          setGo={setGo} go={go} code={code} setCode={(value)=>setCode(value)}
          setResult={setResult} setResultT={setResultT}
           />
      </Split>
    )
  }

export default WorkspacePage;

