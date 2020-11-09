import '../assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../assets/problemresult.css'
function ProblemResult(props) {

    return(
        <div className="problemresult ">
          <div>
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
            )
          })}
          </div>            
        </div>

      
  );
}
export default ProblemResult;
