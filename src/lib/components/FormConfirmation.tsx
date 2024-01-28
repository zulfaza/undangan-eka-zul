'use client';

import { submitInvitation } from '@/app/action';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useId, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import Button from './Button';

const intialState = {
    message: '',
    error: false,
    success: false,
};

type Props = {
    group?: string;
};

const FormConfirmation = ({ group = '-' }: Props) => {
    const [state, formAction] = useFormState(submitInvitation, intialState);
    const [IsOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null)
    const id = useId();

    const handleFormSubmit = (formData: FormData) => {
        formRef.current?.reset()
        formAction(formData)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <section className='container flex mb-5 justify-center items-center flex-col'>
            <h2 className='font-signature text-[#D7AC64] text-center text-4xl'>
                Konfirmasi Kehadiran
            </h2>
            <button
                onClick={openModal}
                className='px-5 mt-10 py-3 text-center font-sans font-medium hover:text-accent border border-accent hover:bg-transparent bg-accent text-white rounded-lg transition-all'
            >
                RSVP
            </button>
            <Transition appear show={IsOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black/25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-10 px-8 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-4xl mb-10 font-signature text-center font-medium leading-6 text-accent'
                                    >
                                        RSVP
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Hi there! Thank you and welcome to Eka & Zul`s wedding
                                            website. We are so excited to see you here. Please enter
                                            your details bellow :
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <form
                                            ref={formRef}
                                            className='flex flex-col justify-center'
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
                                            <input type='hidden' name='group' value={group} />
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
                                            <Button />
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
};

export default FormConfirmation;
