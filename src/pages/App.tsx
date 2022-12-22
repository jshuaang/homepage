import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { BackgroundImage, SpotifyIcon, WhatsappIcon, YoutubeIcon } from '../assets';

function App() {
  const [verse, setVerse] = useState({ text: '', bookname: '', chapter: '', verse: '' })

  const getRandomBibleVerse = async () => {
    await axios.get("https://labs.bible.org/api/?passage=random&type=json").then((res) => setVerse(res?.data[0]))
  }

  const openSpotify = () => {
  }

  useEffect(() => {
    getRandomBibleVerse()
  }, [])

  return (
    <div>
      <div>
        <img src={BackgroundImage} alt='background' className='bg-cover bg-center bg-no-repeat h-screen w-screen' />
      </div>
      <div className='absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col'>
        {/* TOP */}
        <div className='flex justify-center space-x-5 py-5'>
          <a onClick={openSpotify}>
            <img src={SpotifyIcon} alt='spotify-icon' className='w-9' />
          </a>
          {/* <img src={WhatsappIcon} alt='spotify-icon' className='w-9' /> */}
          <a href='https://www.youtube.com/' target='_blank' rel="noreferrer">
            <img src={YoutubeIcon} alt='spotify-icon' className='w-9' />
          </a>
        </div>
        {/* MIDDLE */}
        <div className='flex flex-col text-center text-[3rem] justify-center mt-[5%] flex-1'>
          <p className='text-[5rem]'>9:32</p>
          <p>Good Evening, Joshua</p>
        </div>
        {/* BOTTOM */}
        <div className='flex flex-col text-center mt-auto mb-0 px-5 py-3'>
          <div className='group/quote hover:cursor-pointer'>
            <p className='translate-y-3 transition-all duration-300 group-hover/quote:-translate-y-2 z-10'>{`"${verse?.text}"`}</p>
            <p className='opacity-0 -translate-y-3 transition-all duration-300 group-hover/quote:opacity-100 group-hover/quote:translate-y-0'>{`${verse?.bookname} ${verse?.chapter}:${verse?.verse}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
