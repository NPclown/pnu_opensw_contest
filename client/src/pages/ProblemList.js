import React, {useState,useEffect} from 'react';
import Axios from 'axios'
import '../assets/problemList.css'
import { Link , Redirect} from 'react-router-dom';

function ProblemList(props) {

    const [state,setState]=useState({data:{}, isLoading:true})

    useEffect(() => {
        const getData = async() => {
            try{
                var result = await Axios.get(`/api/workbooks`);
                setState({data: result.data.data.items, isLoading:false})
            } catch(error) {
                alert(error)
                setState({data : {}, isLoading:true})
            }
        }
        getData();
    },[])

    return state.isLoading ? (
      <div className="loading">
          <div>로딩중</div>
      </div>
      )  :
      (
        <div className="App">
            <div className="header">
                문제 목록
            </div>  
            {state.data.map((list, index)=>{
                return(
                    <div className="problem-list">
                        <Link to = {`/${list.id}`} key={index}>
                            {list.id} .             
                            {list.name}
                        </Link>
                    </div>
            )
            })}
        </div>
  );
}
export default ProblemList;

    
