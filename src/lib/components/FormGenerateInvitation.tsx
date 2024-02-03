'use client';

import { AddInvitation, DeleteInvitation } from '@/app/action';
import React, { useEffect, useId, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const intialState = {
    message: '',
    error: false,
    success: false,
};

type InvitationType = {
    id: string;
    groupName: string;
    exppected: number;
    confirm: number;
    user_id?: string;
    date: {
        seconds: number
    }
}

type InvitationCardProps = {
    invitation: InvitationType
}

const InvitationCard = ({ invitation }: InvitationCardProps) => {

    const [deleteState, deleteFormAction] = useFormState(DeleteInvitation, intialState);
    function copyToClipboard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) {
        const target = e.target as HTMLButtonElement;
        navigator.clipboard.writeText(text);
        target.textContent = 'Copied!!';
        setTimeout(() => {
            target.textContent = 'Copy Link';
        }, 500)
    }

    return (
        <div className='bg-white w-full p-4 rounded mb-5 last:mb-0' key={invitation.id}>
            {deleteState?.message.length > 0 ? (
                <p
                    className={`${deleteState.success ? 'bg-green-300' : ''} ${deleteState.error ? 'bg-red-300' : ''
                        } px-4 py-3 rounded-md mb-4 text-sm`}
                >
                    {deleteState?.message}
                </p>
            ) : null}
            <div className='flex justify-between items-start'>
                <div>
                    <h4 className='text-2xl font-bold capitalize mb-2'>{invitation.groupName} <span className='text-sm'>(E : {invitation.exppected ?? 0})(C : {invitation.confirm})</span> </h4>
                    <h5 className='text-sm'>https://nikah.luuzu.id/{invitation.id}</h5>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    <button className='text-white bg-green-500 text-xs px-3 py-2 rounded' onClick={(e) => copyToClipboard(e, `https://nikah.luuzu.id/${invitation.id}`)} >Copy Link</button>
                    <form action={deleteFormAction}>
                        <input type="hidden" name="id" value={invitation.id} />
                        <Button className='bg-gray-700 aria-disabled:bg-gray-400 aria-disabled:cursor-wait disabled:cursor-wait disabled:bg-gray-400 border-2 border-gray-700 hover:bg-gray-600 transition-all px-3 py-2 rounded text-white text-center text-xs' text='Delete' />
                    </form>
                </div>
            </div>
        </div>
    )
}

const FormGenerateInvitation = () => {
    const { state: { user } } = useAuth()
    const [state, formAction] = useFormState(AddInvitation, intialState);
    const [Invitations, setInvitations] = useState<InvitationType[]>([])
    const formRef = useRef<HTMLFormElement>(null);
    const id = useId();

    const handleFormSubmit = (formData: FormData) => {
        formAction(formData)
    }

    useEffect(() => {
        if (!user) {
            return;
        }
        const q = query(collection(db, "invitations"), where("user_id", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const invitations: InvitationType[] = [];
            querySnapshot.forEach((doc) => {
                invitations.push({
                    ...doc.data(),
                    id: doc.id,
                } as InvitationType);
            });
            setInvitations(invitations.sort((a, b) => b.date.seconds - a.date.seconds))
        });

        return unsubscribe;
    }, [user])

    return (
        <section className="w-full h-full flex flex-col items-center justify-center">
            <form
                ref={formRef}
                className='container flex flex-col justify-center px-6 py-8 rounded bg-white'
                action={handleFormSubmit}
            >
                {user &&
                    <input type="hidden" name="uid" value={user.uid} />
                }
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
                        Id (optional)
                    </label>
                    <input
                        id={`id-${id}`}
                        type='text'
                        placeholder='Masukan id disini'
                        name='id'
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
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
                    />
                </div>
                <Button />
            </form>
            <div className='my-4 w-full container'>
                <h2 className='text-white text-xl'>Invitation List</h2>
                <div className='mt-4'>
                    {Invitations.map(invitation => (
                        <InvitationCard key={invitation.id} invitation={invitation} />
                    ))}
                </div>
            </div>
        </section>
    )
}



export default FormGenerateInvitation