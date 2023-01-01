import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BackgroundImage } from '../assets';
import { Footer, Navbar, Todo } from '../components';
import Icon from '../components/Icon';
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

  const [showTodo, setShowTodo] = useState<boolean>(false)
  const [time, setTime] = useState<string>()
  const [greeting, setGreeting] = useState<string>()
  const [verse, setVerse] = useState<verseInterface>({ text: '', bookname: '', chapter: '', verse: '' })

  const handleTodo = () => setTimeout(() => setShowTodo(!showTodo), 500)

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
    setInterval(() => getVerse(), 1800000)
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
        <div className='flex-1 flex justify-center max-h-[70%] p-5'>
          <div className='w-[80%] mt-[5%] flex justify-center space-x-10 group/main'>
            <div className='flex flex-col justify-center opacity-0 group-hover/main:opacity-100 transition-all duration-300'>
              <Icon icon={faArrowLeft} text={""} onClick={handleTodo} />
            </div>
            <div className='flex relative w-full justify-center'>
              <div className={`flex flex-col text-center text-[3rem] justify-center w-[80%] absolute z-30 top-32 duration-300 ${!showTodo ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0 scale-0'}`}>
                <p className='text-[5rem]'>{time}</p>
                <p>{greeting}, {name ? capitalize(name) : null}</p>
              </div>
              <Todo showTodo={showTodo} />
            </div>
            {/* {!showTodo ?
              (<div className={`flex flex-col text-center text-[3rem] justify-center w-[80%]`}>
                <p className='text-[5rem]'>{time}</p>
                <p>{greeting}, {name ? capitalize(name) : null}</p>
              </div>) :
              <Todo />} */}
            <div className='flex flex-col justify-center opacity-0 group-hover/main:opacity-100 transition-all duration-300'>
              <Icon icon={faArrowRight} text={""} onClick={handleTodo} />
            </div>
          </div>
        </div>
        <Footer text={verse?.text} bookname={verse?.bookname} chapter={verse?.chapter} verse={verse?.verse} />
      </div>
    </div>
  );
}

export default App;
