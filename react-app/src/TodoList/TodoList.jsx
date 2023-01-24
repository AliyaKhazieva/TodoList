import './TodoList.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as Basket } from './basket.svg';
import { ReactComponent as Added } from './added.svg';




function TodoList () {

    // инпут

    let [value, setValue] = useState(localStorage.getItem('value') || '')

    let [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])


    function handelChange(event) {
        setValue(event.target.value)
    }

    function handelClick() {
        setTodos([...todos,value])
        setValue('') 
        localStorage.setItem('todos', JSON.stringify([...todos,value]))
    }


    // useEffect(() => {
    //     setTodos(JSON.parse(localStorage.getItem('todos')) || [])
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos))
    // }, [todos])


    useEffect(() => {
        localStorage.setItem('value', value)
    })


    return (
        <>
            <div className='todoList'>
                <h1 className='todoList__name'>ToDo List</h1>
                <div className='todoList_second'>
                    <div className='todoList_input-container'>
                        <input className='todoList_input' type="text" placeholder="Введите текст..."  onChange={handelChange} value={value}/>
                        <button className='todoList_btn' onClick={handelClick} disabled={value === ''}><strong>+</strong></button>
                    </div>
                    <div className='todoList_container'>
                        <select className='todoList_select'>
                            <option className='option' value="">активные</option>
                            <option className='option' value="">завершенные</option>
                            <option className='option' value="">удаленные</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='todoList_list-container'>
              <ul className='todoList_list'>
                {todos.map(function(todo){
                    return (
                        <li className='todoList_todo' key={todo}>{todo} <div className='todoList_basket'><Basket /></div> <div className='todoList_added'><Added /></div></li>
                    )
                })}

              </ul>
            </div>
        </>
    )
}

export default TodoList;