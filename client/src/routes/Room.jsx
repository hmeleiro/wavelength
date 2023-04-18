import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

function Room(props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { body: 'Mensaje de prueba', from: 'testUser' },
  ])

  const { roomId } = useParams()

  useEffect(() => {
    socket.emit('room', roomId)
  }, [])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessages([...messages, { body: message, from: 'Me' }])
    setMessage('')
  }

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      <h1 className='text-4xl mb-2 font-bold'>Chat room {roomId} </h1>
      <form onSubmit={handleSubmit} className='bg-slate-500 p-10'>
        <ul className='h-80 overflow-auto'>
          {messages.map((m, i) => (
            <li
              key={i}
              className={`mb-3 rounded-md p-2 table ${m.from === 'Me'
                ? 'bg-sky-500 text-white'
                : 'bg-slate-300 ml-auto'
                }`}
            >
              <p>
                <span className='font-bold'>{m.from}: </span> {m.body}{' '}
              </p>
            </li>
          ))}
        </ul>

        <input
          type='text'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className='border-2 border-slate-700 p-2 text-black'
        />
        <button className='bg-sky-500 border-2 p-2 rounded-md text-white ml-2'>
          Send
        </button>
      </form>
    </div>
  )
}

export default Room
