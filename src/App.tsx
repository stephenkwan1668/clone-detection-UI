import './App.css'
import FileVisualizer from './FileVisualizer'
import ToggleVisibility from "./toggle.tsx";
import Card from "./Card.tsx";
import {Component} from "react";
import NameForm from "./nameForm.tsx";
import JsonReader from "./JsonReader.tsx";
import HighlightedCode from "./DisplayJavaCode.tsx";

class App extends Component {
    render() {

        return (
            <>
                <h1>HighlightedCode</h1>
                <HighlightedCode startCloneLine={1} endCloneLine={3}/>
                <h1>FileVisualizer</h1>
                <FileVisualizer/>
                <h1>ToggleVisibility</h1>
                <ToggleVisibility/>
                <h1>Card</h1>
                <div style={{display: 'flex', gap: '16px'}}>
                    <Card title="Card Title 1">
                        <p>Card content 1</p>
                    </Card>
                    <Card title="Card Title 2">
                        <p>Card content 2</p>
                    </Card>
                    <Card title="Card Title 3">
                        <p>Card content 3</p>
                    </Card>
                </div>
                <h1>NameForm</h1>
                <NameForm/>
                <JsonReader />
            </>
        )
    }
}

export default App
