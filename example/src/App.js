import React, { useState } from 'react'

import { useNfcRead } from 'react-nfc'

function Read({ timeout }) {
  const nfc = useNfcRead(timeout)
  return (
    <div>
      <div>
        Status: {nfc.status}.
        {nfc.status === 'READY' ? <span>Time: {nfc.time}</span> : null}
        {nfc.status === 'UNAVAILABLE' ? (
          <h3>Nfc disabled for this device</h3>
        ) : null}
      </div>
      <div>Data: {JSON.stringify(nfc.data)}</div>
      <button
        onClick={() => {
          nfc.retry()
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
