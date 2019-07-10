import React, { useState } from 'react'

import { useNfcRead } from 'react-nfc'

function Read({ timeout }) {
  const data = useNfcRead(timeout)
  return (
    <div>
      <div>
        Status: {data.status}.
        {data.status === 'READY' ? <span>Time: {data.time}</span> : null}
        {data.status === 'UNAVAILABLE' ? (
          <h3>Nfc disabled for this device</h3>
        ) : null}
      </div>
      <div>Data: {JSON.stringify(data.data)}</div>
      <button
        onClick={() => {
          console.log(data.retry)
          data.retry()
        }}
      >
        Retry
      </button>
    </div>
  )
}

function App() {
  const [isReading, setIsReading] = useState(false)
  const READ_TIMEOUT = 10
  return (
    <div>
      <h1>Example react-nfc app</h1>
      <button onClick={() => setIsReading(true)}>Read</button>
      <button onClick={() => setIsReading(false)}>Stop Read</button>
      {isReading ? <Read timeout={READ_TIMEOUT} /> : null}
    </div>
  )
}

export default App
