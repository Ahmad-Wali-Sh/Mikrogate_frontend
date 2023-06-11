import React from 'react'

function TestWebSocket() {

  const ws_schema = window.location.protocol === 'http:' ? 'ws:' : 'wss'
  const url = 'ws://127.0.0.1:8000/ws/socket-server/'
  const ws = new WebSocket(url)
  // ws.onopen = function() {
  //   ws.send(JSON.stringify({
  //     action: 'list',
  //     request_id: new Date().getTime(),
  //   }))
  // }
  console.log(url)
  ws.onmessage = function(e) {
    let data = JSON.parse(e.data)
    console.log('Data:', data)
  }
  return (
    <div className='content-wrapper'>
      <div>TestWebSocket</div>
    </div>
  )
}

export default TestWebSocket