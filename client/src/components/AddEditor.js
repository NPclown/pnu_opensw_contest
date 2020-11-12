import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react'
import { Editor } from '@toast-ui/react-editor';
import Button from '@material-ui/core/Button';

function AddEditor(props) {
  const editorRef = React.useRef();

  const handleClick = (index) =>{
    switch (index){
        case 0:
            props.setTitle(editorRef.current.getInstance().getHtml())
            break
        case 1:
            props.setCont(editorRef.current.getInstance().getHtml())
            break
        case 2:
            props.setCode(editorRef.current.getInstance().getHtml())
            break
        case 3:
          props.setInit(editorRef.current.getInstance().getHtml())
          break
        }
  }

    return (
      <>
        <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          placeholder= {props.placeholder}
          ref={editorRef}
        />
        <Button onClick={()=>{handleClick(props.value);alert("등록완료")}} variant="contained" color="primary" disableElevation>
            저장
        </Button>
      </>
    );
}
export default AddEditor;