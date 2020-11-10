import React ,{useState} from 'react';
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Button } from 'reactstrap';
import Editor from './Editor';
import './Workspace.css';
import AceContext from '../context/AceContext';

function Workspace(props) {
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
            testcase={props.testcase}
            setTestCase={props.setTestCase}
            show={props.show}
            handleClose={props.handleClose} 
            handleShow={props.handleShow}
            setShow={props.setShow}
            sample={props.sample}
            setLanguage={props.setLanguage}
            id={props.id}
            toBackEnd={props.toBackEnd}
            toBackEnd2={props.toBackEnd2}
            inits={props.inits} language={props.language} 
            setGo={props.setGo} go={props.go} code={props.code} setCode={(value)=>props.setCode(value)}
            setResult={props.setResult} setResultT={props.setResultT}
          />
          <div className="results-view">
            { Object.keys(props.result.data).length === 0?(
                 ""
                ):(<div>
                  {console.log(props.result)}
                  점수: {props.result.data.score}
                  {props.result.data.result.map((problemresult, index)=>{
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
                {Object.keys(props.resultT.data).length === 0?(
                  ""
                ):(<div>
                  <div className="p-2">
                    {props.resultT.data.result.map((problemresult, index)=>{
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
                )
              </div>
              )}
          </div>
        </Split>
       </AceContext.Provider>
    );
  }

export default Workspace;
