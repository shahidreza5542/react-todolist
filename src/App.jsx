import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState('')
  const [todos, settodos] = useState([])
  const [showfinished , setshowfinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const togglefinished = () => {
    setshowfinished(!showfinished)
  }


  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    savetols()
  }

  const handledelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    savetols()


  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo('')
    savetols()

  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheakbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetols()


  }



  return (
    <>
      <Navbar />
      <div className="cantainer m-auto w-[600px] my-5 rounded-xl p-5 bg-gray-800 min-h-[80vh]">

        <div className=" text-white text-center">
          <div className="addTodo">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input onChange={handlechange}
              value={todo}
              className='inputbox bg-gray-700 mt-5 h-[40px] w-[400px] text-center rounded-xl outline-none' placeholder='Enter Text' type="text" id="" />
            <button onClick={handleadd} className='mainbutton bg-blue-900 m-5 rounded-xl h-[40px] w-[100px] fond-bold text-10xl btn font-bold disabled:bg-red-500' disabled={todo.length<=3}>Save</button>
          </div>

          <div className='flex justify-center mt-5 mb-5'>
            <input onChange={togglefinished } className='mr-2' type="checkbox" checked={showfinished} />
            <p>Show Finished </p>
          </div>
          

          <h1 className='text-lg font-bold'>Your Todos</h1>
          <div className="todos mt-5">
            {todos.length === 0 && <div className='mt-10 text-white '>to todo to display</div>}
            {todos.map(item => {


              return (showfinished || !item.isCompleted) && <div key={item.id} className="mt-3 todo flex w-full justify-between">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handlecheakbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>

                <div className="button flex">
                  <button onClick={(e) => { handleedit(e, item.id) }} className='bg-blue-900 hover:bg-blue-900 p-2 py-1 text-sm font-bold text-white rounded-xl mx-2'>Edit</button>
                  <button onClick={(e) => { handledelete(e, item.id) }} className='bg-blue-900 hover:bg-blue-900 p-2 py-1 text-sm font-bold text-white rounded-xl mx-2'>Delete</button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
