import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import './assets/problemcode.css'

function Problem(){
    //  const [code,setCode] = useState("const")

    String.prototype.unescapeHtml = function(){
        return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"");
      };
      
    const [state,setState]=useState({data:{}})
    useEffect(() => {
        const getData = async() => {
            try{
                var result = await Axios.get(`/api/workbooks/1`);
                setState({data : result.data.data.items})
            } catch(error) {
                alert(error)
                setState({data : {}})
            }
        }
        getData();
    })

    return(
        <div>
            <div className="problem-scroll" dangerouslySetInnerHTML={{__html:String(state.data.cont).unescapeHtml()}}></div>
        </div>
    )
}
export default Problem