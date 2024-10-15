import { useState } from 'react';
import './App.css';
import { useRef } from 'react';
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');

    socket.addEventListener('open', (event) => {
      console.log('Connection established');
    });
    socket.addEventListener('message', (event) => {
      console.log('Message from server', event.data);
      const data = JSON.stringify({ count: countRef.current });
      socket.send(data);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
