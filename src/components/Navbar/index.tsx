import { faArrowRightFromBracket, faGear, faImages } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SpotifyIcon, YoutubeIcon } from '../../assets';
import { auth } from '../../config/firebase';
import Icon from '../Icon';
import Logo from '../Logo';

const Navbar = () => {
    const navigate = useNavigate();
    const [valueSearch, setValueSearch] = useState<string>()
    const [openSetting, setOpenSetting] = useState<boolean>(false)

    const handleClickSetting = (e: any) => setOpenSetting(!openSetting)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValueSearch(e.target.value)
    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        window.open(`https://www.google.com/search?q=${valueSearch}`, '_blank')
        setValueSearch('')
    }

    const logout = (): void => {
        signOut(auth).then((result) => {
            localStorage.clear()
            navigate('/login')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex justify-start space-x-3 py-5 px-5 w-[15%]'>
                    <Logo alt='logo-spotify' linkTo='https://open.spotify.com/playlist/6yUqr5HQG4e1ZCEbL8qT0u?si=28a2e7fce3d24eed' text='Spotify' src={SpotifyIcon} />
                    <Logo alt='logo-youtube' linkTo='https://www.youtube.com/' text='Youtube' src={YoutubeIcon} />
                </div>
                <div className='py-5 flex-1'>
                    <form className='flex justify-center' onSubmit={handleSubmit}>
                        <input value={valueSearch} onChange={handleChange} autoComplete="off" type="text" name="q" placeholder='Type to search...' className='bg-transparent border-b-2 border-b-white outline-none test-[2.25em] text-center w-[50%] py-1' />
                    </form>
                </div>
                <div className='flex justify-end space-x-1 py-5 px-5 w-[15%]'>
                    <Icon icon={faGear} text='Setting' onClick={handleClickSetting} />
                </div>
            </div>
            <div className={
                openSetting
                    ? 'scale-y-1 duration-300 transition-all ease-out origin-top absolute right-5 top-20 space-y-3'
                    : 'scale-y-0 duration-300 transition-all ease-in origin-top absolute right-5 top-20'
            }>
                <Icon icon={faImages} text='Change Background' onClick={null} />
                <Icon icon={faArrowRightFromBracket} text='Logout' onClick={logout} />
            </div>
        </>
    )
}

export default Navbar