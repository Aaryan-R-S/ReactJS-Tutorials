import React, {useState} from 'react'


export default function Formpage(props) {
    const [text, setText] = useState("");
    const [myOccur, setTextOccur] = useState("");
    const [myOccurCount, setOccurCount] = useState(0);

    const onChangeFunc = (event)=>{
        console.log("On change");
        setText(event.target.value);
    }
    const upClick = ()=>{
        console.log("Uppercase clicked");
        let nTxt = text.toUpperCase();
        setText(nTxt);
        props.showAlrt("Converted to Uppercase", "Success")
    }
    const downClick = ()=>{
        console.log("Lowercase clicked");
        let nTxt = text.toLowerCase();
        setText(nTxt);
        props.showAlrt("Converted to Lowercase", "Success")
    }
    const clearTxt = ()=>{
        console.log("Clear clicked");
        let nTxt = "";
        setText(nTxt);
        props.showAlrt("Cleared Text", "Success")
    }
    const copyTxt = ()=>{
        console.log("Copy clicked");
        navigator.clipboard.writeText(text);
        props.showAlrt("Copied Text to Clipboard", "Success")
    }
    const onChangeFuncOccur = (event)=>{
        console.log("On change occur");
        setTextOccur(event.target.value);
    }
    const countOccur = ()=>{
        console.log("Count occurences clicked");
        let regex = new RegExp(myOccur, 'g')
        let searches = text.match(regex);
        if(searches==null || myOccur.split('').filter((elem)=>{return elem!==''}).length===0){
            setOccurCount(0);
        }
        else{
            setOccurCount(searches.length);
        }
        props.showAlrt("Occurences counted successfully", "Success")
    }
    return (
        <>
            <div className="container" style={{color: props.mode==="light"?"black":"white"}} >
                <h3>{props.heading}</h3>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={onChangeFunc} style={{color: props.mode==="light"?"black":"white", backgroundColor: props.mode==="light"?"white":"#252525"}} id="myTextArea" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={upClick} disabled={text.length===0} >Convert to UpperCase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={downClick} disabled={text.length===0} >Convert to LowerCase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={clearTxt} disabled={text.length===0} >Clear Text</button>
                <button className="btn btn-primary mx-1 my-1" onClick={copyTxt} disabled={text.length===0} >Copy Text</button>
                <div className="my-3">
                    <textarea className="form-control" style={{color: props.mode==="light"?"black":"white", backgroundColor: props.mode==="light"?"white":"#252525"}} value={myOccur} onChange={onChangeFuncOccur} id="myOccurArea" rows="1"></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-3" onClick={countOccur} disabled={myOccur.length===0} >Count occurences</button>
                <p>{myOccurCount}</p>
            </div>
            <div className="container my-3" style={{color: props.mode==="light"?"black":"white"}} >
                <h3>Your Text summary</h3>
                <p>{text.split(" ").filter((elem)=>{return elem.length!==0}).length} words, {text.split('').filter((elem)=>{return elem!==' '}).length} charaters</p>
                <p>{0.008 * text.split(" ").filter((elem)=>{return elem.length!==0}).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length>0 ? text:"Nothing to preview"}</p>
            </div>
        </>
    )
}
