import React, { useEffect } from 'react'

import './Main.css'
import UserBox from './MainComponent/UserBox'
import ChatBox from './MainComponent/ChatBox'
import Weather from './MainComponent/Weather'

export default function Main({userData}) {

  return (
    <div className='main'>
      <div className='UserBox'>
        <UserBox userData={userData} />
      </div>
      
      <div className='WeatherBox'>
        <Weather/>
      </div>

      <div className='ChatBox'>
        <ChatBox/>
      </div>

    </div>
  )
}
