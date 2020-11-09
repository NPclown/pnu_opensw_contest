import React from 'react';
import '../assets/ProblemTitle.css'
const ProblemTitle = (props) =>{
    return(
        <div>
            <div className="problem-title">
                <div className={props.main ? "title-main" : ""}>
                    {props.main}
                </div>
                <div className={props.sub ? "title-sub" : ""}>
                    {
                        props.sub ? (
                            props.sub.map((item, index) => (
                                <span key={index}>{item}&nbsp;</span>
                            ))
                        ): ("")
                    }
                </div>
            </div>
        </div>
    )
}
export default ProblemTitle;