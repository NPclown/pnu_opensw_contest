import React from 'react';
import '../assets/problemcode.css'

function Problem(props){

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