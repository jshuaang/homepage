import React from 'react';

interface LogoProps {
    alt: string;
    linkTo: string;
    text: string;
    src: any;
}

const Logo = ({ alt, linkTo, text, src }: LogoProps) => {
    return (
        <div className='flex flex-col justify-center'>
            <a href={linkTo} target='_blank' rel="noreferrer" className='peer/logo'>
                <img src={src} alt={alt} className='w-9 mx-auto' />
            </a>
            <p className='text-xs mt-1 opacity-0 peer-hover/logo:opacity-100 transition-all duration-300'>{text}</p>
        </div>
    )
}

export default Logo