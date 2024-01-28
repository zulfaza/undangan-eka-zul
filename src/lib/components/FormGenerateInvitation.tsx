'use client';

import { AddInvitation } from '@/app/action';
import React, { useId, useRef } from 'react'
import { useFormState } from 'react-dom';
import Button from './Button';

const intialState = {
    message: '',
    error: false,
    success: false,
};

const FormGenerateInvitation = () => {
    const [state, formAction] = useFormState(AddInvitation, intialState);
    const formRef = useRef<HTMLFormElement>(null)
    const id = useId();

    const handleFormSubmit = (formData: FormData) => {
        formRef.current?.reset()
        formAction(formData)
    }

    return (
        <main className="bg-[#161d28] w-screen h-screen flex items-center justify-center">
            <form
                ref={formRef}
                className='container flex flex-col justify-center px-6 py-8 rounded bg-white'
                action={handleFormSubmit}
            >
                {state?.message.length > 0 ? (
                    <p
                        className={`${state.success ? 'bg-green-300' : ''} ${state.error ? 'bg-red-300' : ''
                            } px-4 py-3 rounded-md mb-4`}
                    >
                        {state?.message}
                    </p>
                ) : null}
                <div className='w-full flex flex-col mb-2'>
                    <label
                        className='text-sm text-accent mb-1'
                        htmlFor={`id-${id}`}
                    >
                        Id
                    </label>
                    <input
                        id={`id-${id}`}
                        type='text'
                        placeholder='Masukan id disini'
                        name='id'
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                        required
                    />
                </div>
                <div className='w-full flex flex-col mb-2'>
                    <label
                        className='text-sm text-accent mb-1'
                        htmlFor={`name-${id}`}
                    >
                        Nama
                    </label>
                    <input
                        id={`name-${id}`}
                        type='text'
                        placeholder='Masukan namamu disini'
                        name='name'
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                        required
                    />
                </div>
                <div className='w-full flex flex-col mb-2'>
                    <label
                        className='text-sm text-accent mb-1'
                        htmlFor={`expected-${id}`}
                    >
                        Ekspektasi (optional)
                    </label>
                    <input
                        id={`expected-${id}`}
                        type='number'
                        placeholder='Masukan ekspektasi berapa orang'
                        name='expected'
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                        required
                    />
                </div>
                <Button />
            </form>
        </main>
    )
}

export default FormGenerateInvitation