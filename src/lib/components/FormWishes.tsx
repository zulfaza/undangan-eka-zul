'use client';
import { submitWish } from '@/app/action';
import React, { useId, useRef } from 'react';
import { useFormState } from 'react-dom';
import Button from './Button';

const intialState = {
    message: '',
    error: false,
    success: false,
};

const FormWishes = () => {
    const [state, formAction] = useFormState(submitWish, intialState);
    const formRef = useRef<HTMLFormElement>(null);
    const id = useId();
    const handleFormSubmit = (formData: FormData) => {
        formRef.current?.reset();
        formAction(formData);
    };
    return (
        <div className='container mt-12'>
            <h2 className='font-signature mb-5 text-[#D7AC64] text-center text-4xl'>
                Wishes
            </h2>
            <p className='text-center font-sans text-sm text-accent'>
                Berikan ucapan harapan dan do’a kepada kedua mempelai
            </p>
            <form
                ref={formRef}
                className='flex flex-col justify-center mt-10'
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
                    <label className='text-sm text-accent mb-1' htmlFor={`name-${id}`}>
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
                    <label className='text-sm text-accent mb-1' htmlFor={`message-${id}`}>
                        Pesan
                    </label>
                    <textarea
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                        placeholder='Masukan pesanmu disini'
                        name='message'
                        id={`message-${id}`}
                        rows={7}
                    ></textarea>
                </div>
                <Button />
            </form>
        </div>
    );
};

export default FormWishes;
