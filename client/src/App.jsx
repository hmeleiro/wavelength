import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useNavigate } from "react-router-dom";

import './App.css'

const socket = io('http://localhost:4000')

function App() {
  const [room, setRoom] = useState(null)
  const [activeRoom, setActiveRoom] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('room', (room) => {
      console.log(room)
      setActiveRoom(room)
    })
  }, [activeRoom])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('room', room)
    console.log(room)
    return navigate(`/room/${room}`)
  }

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      <h1 className='text-4xl mb-2 font-bold'>Join a room</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setRoom(e.target.value)}
          className='border-2 border-slate-700 p-2 text-black'
        />
        <button className='bg-sky-500 border-2 p-2 rounded-md text-white ml-2'>
          Join
        </button>
      </form>
    </div>
  )
}

export default App
