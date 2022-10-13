import './App.css';
import { useState } from "react"
import Select from  './components/Select'

type selectOption = {
  label: string
  value: string | number
} 

const options =[
  {label: "First", value: 1},
  {label: "Second", value: 2},
  {label: "Third", value: 3},
  {label: "Fourth", value: 4},
  {label: "Fifth", value: 5},
]

function App() {
  const [value, setValue] = useState<selectOption | undefined>(undefined)

  return (
    <div className="App">
    <h1>Hello World</h1>
    <Select options = {options} value={value} onChange = { o => setValue(o)}/>
    </div>
  );
}

export default App;
