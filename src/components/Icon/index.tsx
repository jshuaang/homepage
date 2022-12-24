import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconProps {
    text: string;
    icon: any;
    onClick: any
}

const Icon = ({ text, icon, onClick }: IconProps) => {
    return (
        <div className='flex flex-col justify-top w-14' onClick={onClick}>
            <FontAwesomeIcon icon={icon} className='cursor-pointer text-2xl peer/icon' />
            <p className='text-xs mt-1 opacity-0 peer-hover/icon:opacity-100 transition-all duration-300 text-center'>{text}</p>
        </div>
    )
}

export default Icon