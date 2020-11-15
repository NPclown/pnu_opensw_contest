import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react'
import { Editor } from '@toast-ui/react-editor';
import {Button} from '@material-ui/core';

function AddEditor(props) {
  const editorRef = React.useRef();

  const handleClick = (e) =>{
    e.preventDefault()
    props.setCont(editorRef.current.getInstance().getHtml())
    const tmp = [...props.complete];
    tmp[1].state = true;
    props.setComplete(tmp)
    alert("등록 완료!")
  }

    return (
      <>
        <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          placeholder= {props.placeholder}
          ref={editorRef}
          initialValue={props.cont}
        />
        <Button onClick={(e)=>{handleClick(e)}} variant="contained" color="primary" disableElevation>
            저장
        </Button>
      </>
    );
}
export default AddEditor;