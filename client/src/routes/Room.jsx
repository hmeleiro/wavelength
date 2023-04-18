import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import dictionary from '../assets/words.json'

const socket = io('http://localhost:4000')

function Room(props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { body: 'Mensaje de prueba', from: 'testUser' },
  ])
  const [words, setWords] = useState([])

  const { roomId } = useParams()

  useEffect(() => {
    socket.emit('room', roomId)
    socket.on('words', (words) => {
      setWords(words)
    })
  }, [])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])


  const handleDrawCards = () => {
    const shuffledDictionary = dictionary.sort(() => 0.5 - Math.random());
    const words = shuffledDictionary.slice(0, 25);

    socket.emit('words', words)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessages([...messages, { body: message, from: 'Me' }])
    setMessage('')
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='grid grid-cols-5 mr-4'>
        {words ? words.map((e, i) => (
          <div key={i} className='bg-amber-500 m-1 p-3 rounded-sm'>{e}</div>
        )) : ""}

        {
          words.length > 0 ? "" : <button onClick={handleDrawCards} className='bg-sky-500 border-2 p-2 rounded-md text-white ml-2'>Repartir</button>
        }
      </div>
      <div className='flex flex-col'>
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
    </div>
  )
}

export default Room
