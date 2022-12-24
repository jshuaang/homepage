import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BackgroundImage } from '../assets';
import { Footer, Navbar } from '../components';
import { getCurrentTime } from '../utils';

interface verseInterface {
  text: string
  bookname: string
  chapter: string
  verse: string
}

function App() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const [time, setTime] = useState<string>()
  const [greeting, setGreeting] = useState<string>()
  const [verse, setVerse] = useState<verseInterface>({ text: '', bookname: '', chapter: '', verse: '' })

  const capitalize = (word: string): string => {
    let firstName = word.split(" ")[0]
    const lower = firstName.toLowerCase();
    return firstName.charAt(0).toUpperCase() + lower.slice(1);
  }

  const getTime = (): void => {
    const result = getCurrentTime()
    setTime(result.time)
    setGreeting(result.greeting)
  }

  const getVerse = async () => {
    await axios.get("https://labs.bible.org/api/?passage=random&type=json").then(res => setVerse(res?.data[0]))
  }

  useEffect(() => {
    getTime()
    getVerse()
  }, [])

  useEffect(() => {
    setInterval(() => getTime(), 1000);
    setInterval(() => getVerse(), 10000)
  }, [])


  return (
    <div>
      {!token && (
        <Navigate to="/login" replace={true} />
      )}
      <div>
        <img src={BackgroundImage} alt='background' className='bg-cover bg-center bg-no-repeat h-screen w-screen' />
      </div>
      <div className='absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col'>
        <Navbar />
        <div className='flex flex-col text-center text-[3rem] justify-center mt-[5%] flex-1'>
          <p className='text-[5rem]'>{time}</p>
          <p>{greeting}, {name ? capitalize(name) : null}</p>
        </div>
        <Footer text={verse?.text} bookname={verse?.bookname} chapter={verse?.chapter} verse={verse?.verse} />
      </div>
    </div>
  );
}

export default App;
