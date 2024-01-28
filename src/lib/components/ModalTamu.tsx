'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'

type Props = {
    group: string;
    groupName?: string;
}

const ModalTamu = ({ group, groupName }: Props) => {
    const [IsModalOpen, setIsModalOpen] = useState(true)

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Transition appear show={IsModalOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={closeModal}>
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
                    <div className='flex min-h-full items-center justify-center text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-screen h-screen relative bg-white align-middle shadow-xl transition-all'>
                                <div className="container bg-[url(/images/Cover-undangan.jpg)] bg-cover relative h-full p-10 flex justify-center items-center">
                                    <div className='bg-gradient-to-t from-[rgba(64,80,107,0.50)] from-65% to-transparent absolute top-0 left-0 w-full h-full z-0'></div>
                                    <div className='z-10 relative'>
                                        <div className='mb-5 text-white'>
                                            <h3 className='text-sm mb-10'>The Wedding Of</h3>
                                            <h2 className='font-strawberrycupcakes text-5xl md:text-8xl mb-5'>Zul & Eka</h2>
                                            {group !== '-' &&
                                                <>
                                                    <h4 className='text-sm font-sans mb-3'>Dear : </h4>
                                                    <h3 className='text-lg'>{groupName}</h3>
                                                </>
                                            }
                                        </div>
                                        <button onClick={closeModal} className='bg-accent text-white hover:bg-white hover:bg-opacity-55 hover:text-accent hover:border-white border-2 border-accent font-medium transition-all px-5 py-2 rounded-lg'>
                                            Buka Undangan
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalTamu