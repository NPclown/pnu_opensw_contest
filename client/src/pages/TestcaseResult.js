import '../assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import '../assets/problemresult.css';
import React, {useState,useEffect} from 'react';
function TestcaseResult(props) {

    return(
        <div className="problemresult">
          <div>
          {props.result.data.result.map((problemresult, index)=>{
              return(
                <div>
                  <div className="top-line">                
                  결과: {problemresult.success?("성공"):("실패")}
                  </div>
                  <div>                
                  입력값: {problemresult.input}
                  </div>
                  <div>                
                  기댓값: {problemresult.output}
                  </div>
                  <div>                
                  실행 결과: {problemresult.result}
                  </div>
                  <div>                
                  {problemresult.prints}
                  </div>
                </div>
              )
          })}
          </div>            
        </div>
  );
}
export default TestcaseResult;
