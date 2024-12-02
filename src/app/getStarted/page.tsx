'use client'

import './getStarted.scss'
import Confetti from "react-confetti-boom";

export default function Page() {
  return (
      <section className={`gSContainer`}>
        <div className={`gSWrapper`}>
          <div className={`logo`} />
          <div className={`textBox`}>
            <h1>Welcome to  Palette</h1>
            <h2>
              귀하와 함께하게 되어 기쁘고 Palette 에서 창의적인 <br />
              일을 할 수 있기를 기대합니다.
            </h2>
          </div>
          <button className={`gSBtn`}>Get Started</button>
        </div>
        <Confetti mode={"fall"} particleCount={50} colors={['#ff577f', '#ffd54b', '#9cff4b', '#4b84ff', '#b450ff']} shapeSize={24} />
      </section>
  )
}
