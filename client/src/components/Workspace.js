import React ,{useState} from 'react';
import Split from 'react-split';
import Editor from './Editor';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  resultsView: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  }));


function Workspace(props) {
  const [result,setResult] = useState({data:{}, isLoading:true})
  const [resultT,setResultT] = useState({data:{}, isLoading:true})
  const classes = useStyles();

  return (
      <Split direction="vertical" sizes={[50, 50]} minSize={[100, 0]} gutterSize={4}>
        <Editor
          {...props}
          setResult={setResult} setResultT={setResultT}
        />
        <div className={classes.resultsView}>
          { Object.keys(result.data).length === 0?(
                ""
              ):(
                result.data.state>0? (
                  result.data.state === 137 ? (
                  <div>
                    <div className="p-2">
                    <p><b>점수: {result.data.score}</b></p>
                    <div>
                      <p><b>-----------------------------------------------------------------------</b></p>
                    </div>                    
                      {result.data.result.map((problemresult, index)=>{
                          return(
                            <div key={index}>
                              <div>                
                              <p><b>결과:</b>"실패"</p> 
                              </div>
                              <div>                      
                              <p><b>런타임:</b> {problemresult.result.err}</p>
                              </div>
                              <div>
                                <p><b>-----------------------------------------------------------------------</b></p>
                              </div>
                            </div>
                          )
                      })}
                    </div>
                  </div>
                  ):(
                    <div>
                    <div className="p-2">
                      <p><b>점수: {result.data.score}</b></p>
                      <div>
                        <p><b>-----------------------------------------------------------------------</b></p>
                      </div>
                    {result.data.result.map((problemresult, index)=>{
                      return(
                        <div key={index}>
                          <div>                
                          <p><b>결과:</b>{problemresult.success?("성공"):("실패")}</p> 
                          </div>
                          <div>                
                          <p><b>런타임:</b> {problemresult.err}</p>
                          </div>
                          <div>
                            <p><b>-----------------------------------------------------------------------</b></p>
                          </div>
                        </div>
                        )})}
                      </div>
                    </div>
                  )
                ) : (
                <div>
                <p><b>점수: {result.data.score}</b></p>
                <div>
                  <p><b>-----------------------------------------------------------------------</b></p>
                </div>                
                {result.data.result.map((problemresult, index)=>{
                return(
                  <div key={index}>
                    <div>                
                    <p><b>결과:</b>{problemresult.success?("성공"):("실패")}</p> 
                    </div>
                    <div>                
                    <p><b>런타임:</b> {problemresult.time}</p>
                    </div>
                    <div>
                      <p><b>-----------------------------------------------------------------------</b></p>
                    </div>  
                  </div>
                  )})}
              </div>))}
              {Object.keys(resultT.data).length === 0?(
                ""
              ):(resultT.data.state>0 ? (
                resultT.data.state === 137 ? (
                <div>
                <div className="p-2">
                  {resultT.data.result.map((problemresult, index)=>{
                      return(
                        <div key={index}>
                          <div>                
                          <p><b>결과:</b>"실패"</p> 
                          </div>
                          <div>                      
                          <p><b>실행결과:</b> {problemresult.result.err}</p>
                          </div>
                          <div>
                            <p><b>-----------------------------------------------------------------------</b></p>
                          </div>
                        </div>
                      )
                  })}
                </div>
                </div>
                ) : (
                  <div>
                      <div>                
                          <p><b>컴파일 에러</b></p> 
                        </div>
                          <div>                      
                          <p>{resultT.data.result.err}</p>
                      </div>
                  </div>
                )
              ) : (
                <div>
                <div className="p-2">
                  {resultT.data.result.map((problemresult, index)=>{
                      return(
                        <div key={index}>
                          <div>                
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
                          {problemresult.prints ? (<p><b>실행결과:</b> {problemresult.prints} </p>) : ('')}              
                          </div>
                          <div>
                            <p><b>-----------------------------------------------------------------------</b></p>
                          </div>
                        </div>
                      )
                  })}
                </div>
            </div>
            ))}
        </div>
      </Split>
  );
}

export default Workspace;
