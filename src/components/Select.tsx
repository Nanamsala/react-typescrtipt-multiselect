import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type selectOption = {
  label: string
  value: string | number
}

type singleSelectProps = {
  multiple?: false
  value?: selectOption
  onChange: (value: selectOption | undefined) => void
}

type multiSelectProps = {
  multiple: true
  value: selectOption[]
  onChange: (value: selectOption[]) => void
}

type selectProps={
  options: selectOption[]
} & (singleSelectProps | multiSelectProps)

export default function Select({multiple,value,onChange,options}:selectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHighlighted, setHighlighted] = useState(0)

  function clearOptions(){
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: selectOption){
   if(multiple){
    if(value.includes(option)) onChange(value.filter(o => o !== option))
    else onChange([...value,option])
   }
   else onChange(option)
  }

  function isOptionSelected(option:selectOption){
    return multiple? value.includes(option) : option === value
  }


  useEffect(() =>{
    if (isOpen) setHighlighted(0)
  }, [isOpen])

  return (
    <div 
      onClick={ ()=>setIsOpen(prev => !prev)}
      tabIndex={0} 
      className = {styles.container}
    >
      <span className={styles.value}>
        {multiple? value.map((val) =>(
          <button 
          key={val.label} 
          onClick={e => {
            e.stopPropagation()
            selectOption(val)
          }}
          className={styles["option-badge"]}
          >
            {val.label}
            <span className={styles["clear-button"]}>&times;</span>
          </button>
        )) : value?.label}
      </span>
      <button 
        onClick={e =>{
          e.stopPropagation()
          clearOptions()
        }}
        className={styles["clear-button"]}
      >
          &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li 
          onClick={e =>{
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
          }}

          onMouseEnter={()=>setHighlighted(index)}
          key={option.value} 
          className={`${styles.option} ${isOptionSelected(option)? styles.selected : ""} ${index === isHighlighted? styles.highlighted : ""}`}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
