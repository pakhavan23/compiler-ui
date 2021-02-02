import React , { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import moon from '../images/moon-2.png';
import sun from '../images/sun-2.png';
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-error_marker";
import '../styles/styles.css';
const { ipcRenderer } = window.require("electron");


const Editor = () => {                                      //Text Editor component
    const [open , openTab] = useState(false);               //deeclaring a state for opening the execution tab
    const [theme,changeTheme] = useState(false);            //declaring a state for changing themes 
    const [text, setText] = useState("");
    const [errors, setErrors] = useState("No errors yet");

    useEffect(() => {
        ipcRenderer.on('data:errors', (e, value) => {
            setErrors(value);
        });
    }, []);

    const handleTab = () => {                               //onClick method that closes the execution tab      
        let tab = document.getElementById("tab")
        tab.classList.add("exit")                           //the animation for closing the tab is added
        setTimeout(() => {
            openTab(!open);                                 
            tab.classList.remove("exit");
        }, 300);
    }

    const getCode = (val) => {                              //extracts the code from the editor
        setText(val);
    }

    const handleRunClick = () => {
        openTab(true);
        ipcRenderer.send('click:run', text);
    }

    return(
        <section className={theme ? "main lightbg" : "main darkbg"}>
            <header>
                <section className={theme ? "title black" : "title white"}>
                    <h1>Sina#</h1>
                    <p>A language for the compiler project</p>
                </section>
                <section className="buttons">
                    <button onClick={() => changeTheme(!theme)} type="button" className="white">            
                        {theme ? <img className="sun" alt="sun" src={sun} /> : <img alt="moon" src={moon} /> }
                    </button>
                    <button type="button" onClick={handleRunClick} className={theme ? "black space" : "white space"}>
                        Run
                        <svg class={theme ? "icon iconblack" : "icon iconwhite"} height="14" viewBox="8 4 10 16" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"></path></svg>
                    </button>
                </section>
            </header>
            <section className="editor">
                <AceEditor
                    value={text}
                    onChange={getCode}
                    highlightActiveLine={true}
                    mode="rust" theme={theme ? "xcode" : "monokai"} 
                    name="editor"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion : true,
                        enableSnippets: true,
                        tabSize: 1,
                    }}
                />
            </section>
            <section className={theme ? "exc lightexc" : "exc darkexc"}>
                { open ? 
                    <section id="tab" className={theme ? "tab openlight" : "tab opendark"}>
                        <section className="hdr">
                            <h3 className="green">Execution</h3>
                            <span onClick={handleTab} className="exit green">X</span>
                        </section>
                        <section className="errors">
                            <section className="errtitle">
                                <h3 className={theme ? "black" : "white"}>Errors</h3>
                                <hr className={theme ? "hrblack" : "hrwhite"}/>
                            </section>
                            <section className={theme ? "text light" : "text"}>
                                <p style={{overflow: "auto"}}>
                                    {errors ?
                                     errors.split('\n').map(line => (<>{line}<br/></>))
                                     :
                                     "No errors yet"}
                                </p>
                            </section>
                        </section>
                    </section>
                     :  null}
                    <button onClick={() => openTab(!open)} className={theme ? "exctab lightexc green" : "exctab darkexc green"}>
                        Execution
                    </button>
                
            </section>
        </section>
    )
}

export default Editor;
