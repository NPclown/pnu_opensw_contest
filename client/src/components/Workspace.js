import React ,{useEffect, useState} from 'react';
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Button } from 'reactstrap';
import Editor from './Editor';
import './Workspace.css';
import AceContext from '../context/AceContext';

function Workspace(props) {
  const [result,setResult] = useState({data:{}, isLoading:true})
  const [resultT,setResultT] = useState({data:{}, isLoading:true})

  const state = {
    input: '',
    result: null,
    testResults: null,
    working: false,
    tab: 0,
    aceProps: {
      theme: 'dawn',
      keyboardHandler: ''
  }}

  return (
      <AceContext.Provider value={state.aceProps}>
      <Split direction="vertical" sizes={[50, 50]} minSize={[100, 0]} gutterSize={4}>
        <Editor
          {...props}
          setResult={setResult} setResultT={setResultT}
        />
        <div className="results-view">
          { Object.keys(result.data).length === 0?(
                ""
              ):(<div>
                {console.log(result)}
                점수: {result.data.score}
                {result.data.result.map((problemresult, index)=>{
                return(
                  <div>
                    <div className="top-line">                
                    결과: {problemresult.success?("성공"):("실패")}
                    </div>
                    <div>                
                    런타임: {problemresult.time}
                    </div>
                  </div>
                  )})}
              </div>)}
              {Object.keys(resultT.data).length === 0?(
                ""
              ):(<div>
                <div className="p-2">
                  {resultT.data.result.map((problemresult, index)=>{
                      return(
                        <div>
                          <div className="top-line">                
                          <p><b>결과:</b>{problemresult.success?("성공"):("실패")}</p> 
                          </div>
                          <div>                
                          <p><b>입력값:</b> {problemresult.input}</p>
                          </div>
                          <div>                
                          <p><b>기댓값:</b> {problemresult.output}</p>
                          </div>
                          <div>                
                          <p><b>실행결과:</b> {problemresult.result}</p>
                          </div>
                          <div>                
                          {problemresult.prints}
                          </div>
                        </div>
                      )
                  })}
                </div>
            </div>
            )}
        </div>
      </Split>
      </AceContext.Provider>
  );
}

export default Workspace;
