import React from 'react'
import { useFormStatus } from 'react-dom';

const Button = () => {
    const { pending } = useFormStatus();
    return (
        <button
            className='bg-accent aria-disabled:bg-gray-400 aria-disabled:cursor-wait disabled:cursor-wait disabled:bg-gray-400 border-2 border-accent hover:bg-transparent hover:text-accent transition-all px-4 py-3 rounded-md text-white text-center'
            aria-disabled={pending}
        >
            Submit
        </button>
    )
}

export default Button