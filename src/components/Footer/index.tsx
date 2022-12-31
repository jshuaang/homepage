interface FooterProps {
    text: string;
    bookname: string;
    chapter: string;
    verse: string
}

const Footer = ({ text, bookname, chapter, verse }: FooterProps) => {
    return (
        <div className='flex flex-col w-[80%] h-[15%] mx-auto text-center mt-auto mb-0 px-5 py-3'>
            <div className='group/quote hover:cursor-pointer'>
                <p className='translate-y-3 transition-all duration-300 group-hover/quote:-translate-y-2 z-10'>{`"${text}"`}</p>
                <p className='opacity-0 -translate-y-3 transition-all duration-300 group-hover/quote:opacity-100 group-hover/quote:translate-y-0'>{`${bookname} ${chapter}:${verse}`}</p>
            </div>
        </div>
    )
}

export default Footer