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
                const name: any = user?.displayName
                if (user && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('name', name)
                    navigate('/');
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
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
                <div className='w-[30%] h-auto border-white border-2 rounded-xl p-2 my-auto flex justify-center hover:bg-slate-100 hover:bg-opacity-10 cursor-pointer space-x-5' onClick={login}>
                    <div className=''>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='logo-google' />
                    </div>
                    <p>Sign in with google</p>
                </div>
            </div>
        </div>
    )
}

export default Login