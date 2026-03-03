import React from 'react'

const Wellness = ({ icon, text, isOpen, setIsOpen }) => {
    return (
        <div className='flex items-center gap-4 cursor-pointer w-full hover:text-blue-400'>
            <span
                data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                data-tooltip-content={!isOpen ? text : undefined}
                className="text-xl" onClick={() => setIsOpen((prev) => !prev)}>
                {icon}
            </span>
            {isOpen && <div>{text}</div>}
        </div>
    )
}

export default Wellness
