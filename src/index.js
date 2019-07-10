import { useEffect, useState } from 'react'

function noop() {}

const stopWatching = watchId => {
  navigator.nfc
    .cancelWatch(watchId)
    .then(() => {
      console.log('Stopped watching for a nfc tag.')
    })
    .catch(error => {
      if (error.name === 'NotFoundError') {
        // we're ignoring NotFoundError, assuming it happened because the
        // watch was already cancelled after a write
        return
      }
      throw error
    })
}

function nfcAvailable() {
  if (navigator.nfc) {
    return true
  }
  return false
}

function read(setResponse = noop, timeout) {
  if (!nfcAvailable()) {
    setResponse(prevState => ({
      ...prevState,
      status: 'UNAVAILABLE',
    }))
    return
  }
  setResponse(prevState => ({
    ...prevState,
    status: 'INITIALIZING',
  }))
  navigator.nfc
    .watch(message => {
      setResponse(prevState => ({
        ...prevState,
        data: message.records[0].data,
      }))
    })
    .then(watchId => {
      const timeoutId = setTimeout(() => {
        stopWatching(watchId)
        setResponse(prevState => ({
          ...prevState,
          status: 'TIMEOUT',
        }))
      }, timeout * 1000)
      const intervalId = setInterval(() => {
        setResponse(prevState => ({
          ...prevState,
          time: prevState.time - 1,
        }))
      }, 1000)
      setResponse(prevState => ({
        ...prevState,
        status: 'READY',
        time: timeout,
        retry: () => {
          clearTimeout(timeoutId)
          clearInterval(intervalId)
          stopWatching(watchId)
          read(setResponse, timeout)
        },
      }))
    })
}

function useNfcRead(timeout = 15) {
  const [response, setResponse] = useState({ retry: noop })
  useEffect(() => {
    read(setResponse, timeout)
    return () => stopWatching()
  }, [])
  return response
}

export { useNfcRead }
