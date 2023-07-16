import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router';
import { BackgroundImage } from '../assets';
import { auth, provider } from '../config/firebase';

const Login = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const login = (): void => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                const token: any = credential?.accessToken;
                const uid: any = user?.uid;
                const name: any = user?.displayName;
                if (user && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('uid', uid);
                    localStorage.setItem('name', name);
                    navigate('/');
                }
            }).catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    }

    return (
        <div>
            {token && (
                <Navigate to="/" replace={true} />
            )}
            <div>
                <img src={BackgroundImage} alt='background' className='bg-cover bg-center bg-no-repeat h-screen w-screen' />
            </div>
            <div className='absolute z-10 top-0 left-0 bottom-0 right-0 flex justify-center'>
                <div className='w-[27%] px-8 py-4 h-auto bg-white border-white border-2 rounded-full rounded-xl my-auto flex justify-center transition hover:duration-200 hover:bg-slate-100 hover:bg-opacity-10 cursor-pointer space-x-5 shadow-md' onClick={login}>
                    <div className='w-full flex justify-between items-center gap-8'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='logo-google' className="w-16 h-16" />
                        <div className='w-[100%] text-center'>
                            <p className="font-bold text-3xl text-[#808080]">Sign in with Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login