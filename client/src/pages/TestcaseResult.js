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
                  <div>                
                  {problemresult.success?("성공"):("실패")}
                  </div>
                  <div>                
                  {problemresult.input}
                  </div>
                  <div>                
                  {problemresult.output}
                  </div>
                  <div>                
                  {problemresult.result}
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
