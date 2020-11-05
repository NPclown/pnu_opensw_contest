import React, {useState,useEffect} from 'react';
import '../assets/problemcode.css'

function Problem(props){
    //  const [code,setCode] = useState("const")

    String.prototype.unescapeHtml = function(){
        return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"");
      };
      
    return(
        <div className="problem-scroll">
            <div dangerouslySetInnerHTML={{__html:String(props.cont).unescapeHtml()}}></div>
        </div>
    )
}
export default Problem