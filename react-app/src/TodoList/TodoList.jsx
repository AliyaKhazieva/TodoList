import './TodoList.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as Basket } from './basket.svg';
import { ReactComponent as Added } from './added.svg';




function TodoList () {


    let [value, setValue] = useState(localStorage.getItem('value') || '')

    let [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])


    function handelChange(event) {
        setValue(event.target.value)
    }


    function handelClick() {
        let valueTodo = {id: Math.random(), text: value, status: 'active'}
        setTodos([...todos, valueTodo])
        setValue('') 
        localStorage.setItem('todos', JSON.stringify([...todos,valueTodo]))
    }


    useEffect(() => {
        localStorage.setItem('value', value)
    },[value])


    // меняем статус
    let handleChangeStatus = (todo, status) => {
        todo.status = status
        localStorage.setItem('todos', JSON.stringify(todos))
        setTodos([...todos])
    }


    // меняем статус у селекта
    let [status, setStatus] = useState(localStorage.getItem('status') || 'active')

    let changeStatus = (e) => {
        setStatus(e.target.value)
    }


    useEffect(() => {
        localStorage.setItem('status', status)
    },[status])

   
    let results = todos.filter(todo => todo.status === status)



    return (
        <>
            <div className='todoList'>
                <h1 className='todoList__name'>ToDo List</h1>
                <div className='todoList_second'>
                    <div className='todoList_input-container'>
                        <input className='todoList_input' type="text"  maxLength={45} placeholder="Введите текст..."  onChange={handelChange} value={value}/>
                        <button className='todoList_btn' onClick={handelClick} disabled={value === ''}><strong className='send'>+</strong></button>
                    </div>
                    <div className='todoList_container'>
                        <select  defaultValue={status} className='todoList_select'  onChange={changeStatus}>
                            <option className='option' value="active">активные</option>
                            <option className='option' value="done">завершенные</option>
                            <option className='option' value="deleted">удаленные</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='todoList__todo'>
              <ul className='todoList__list'>
                {results.map(function(result){
                    return (
                        <li className='todoList__map' key={result.id}>
                            {result.text}
                            <div className='todoList__basket' onClick={() => handleChangeStatus(result, 'deleted')}><Basket className='basket'/></div> 
                            <div className='todoList__added' onClick={() => handleChangeStatus(result, 'done')}><Added className='added'/></div>
                        </li>
                    )
                })}

              </ul>
            </div>
        </>
    )
}

export default TodoList;