import './App.css';
import { useState } from "react"
import Select from  './components/Select'
import { selectOption } from './components/Select';

const options =[
  {label: "First", value: 1},
  {label: "Second", value: 2},
  {label: "Third", value: 3},
  {label: "Fourth", value: 4},
  {label: "Fifth", value: 5},
]

function App() {
  const [value, setValue] = useState<selectOption | undefined>(undefined)
  const [value2, setValue2] = useState<selectOption[]>([])

  return (
    <div className="App">
    <h1>Multi Select Typescript React Practice</h1>
    <Select options = {options} value={value} onChange = { o => setValue(o)}/>
    <Select multiple options = {options} value={value2} onChange = { o => setValue2(o)}/>
    </div>
  );
}

export default App;
