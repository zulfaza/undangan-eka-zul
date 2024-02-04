'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import slugify from 'slugify';
import makeId from '../helper/makeId';

type InvitationType = {
    id: string;
    groupName: string;
    exppected: number;
    confirm: number;
    user_id?: string;
    date: {
        seconds: number;
    };
};

type InvitationCardProps = {
    invitation: InvitationType;
};

const InvitationCard = ({ invitation }: InvitationCardProps) => {
    const [IsError, setIsError] = useState(false);
    const [Message, setMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    const handleDeleteDoc = async (id: string) => {
        setIsLoading(true);
        setMessage('');
        setIsError(false);
        try {
            if (!id) {
                throw new Error('Missing id');
            }

            await deleteDoc(doc(db, 'invitations', id));
            setMessage('Berhasil menghapus');
            setIsLoading(false);
        } catch (error) {
            let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
            if (
                error &&
                typeof error === 'object' &&
                'message' in error &&
                typeof error.message === 'string'
            ) {
                ErrorMessage = error.message;
            }
            console.log('here', ErrorMessage);
            setMessage(ErrorMessage);
            setIsError(true);
            setIsLoading(false);
        }
    };

    function copyToClipboard(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        text: string
    ) {
        const target = e.target as HTMLButtonElement;
        navigator.clipboard.writeText(text);
        target.textContent = 'Copied!!';
        setTimeout(() => {
            target.textContent = 'Copy Link';
        }, 500);
    }
    return (
        <div
            className='bg-white w-full p-4 rounded mb-5 last:mb-0'
            key={invitation.id}
        >
            {Message.length > 0 ? (
                <p
                    className={`${IsError ? 'bg-red-300' : 'bg-green-300'
                        } px-4 py-3 rounded-md mb-4 text-sm`}
                >
                    {Message}
                </p>
            ) : null}
            <div className='flex justify-between items-start'>
                <div>
                    <h4 className='text-2xl font-bold capitalize mb-2'>
                        {invitation.groupName}{' '}
                        <span className='text-sm'>
                            (E : {invitation.exppected ?? 0})(C : {invitation.confirm})
                        </span>{' '}
                    </h4>
                    <h5 className='text-sm'>https://nikah.luuzu.id/{invitation.id}</h5>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    <button
                        className='text-white bg-green-500 text-xs px-3 py-2 rounded'
                        onClick={(e) =>
                            copyToClipboard(e, `https://nikah.luuzu.id/${invitation.id}`)
                        }
                    >
                        Copy Link
                    </button>
                    <button
                        type='button'
                        onClick={() => handleDeleteDoc(invitation.id)}
                        aria-disabled={IsLoading}
                        className='bg-gray-700 aria-disabled:bg-gray-400 aria-disabled:cursor-wait disabled:cursor-wait disabled:bg-gray-400 border-2 border-gray-700 hover:bg-gray-600 transition-all px-3 py-2 rounded text-white text-center text-xs'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const FormGenerateInvitation = () => {
    const {
        state: { user },
    } = useAuth();
    const [Invitations, setInvitations] = useState<InvitationType[]>([]);
    const [IsLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [IsError, setIsError] = useState(false);
    const [Message, setMessage] = useState('');
    const [Name, setName] = useState('');
    const [Slug, setSlug] = useState('');
    const [Expectation, setExpectation] = useState('0');

    const id = useId();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);
        try {
            const user_id = auth.currentUser?.uid;
            const id = Slug.length > 0 ? slugify(Slug) : makeId(5);
            await setDoc(doc(db, 'invitations', id), {
                groupName: Name,
                expected: isNaN(parseInt(Expectation)) ? 0 : parseInt(Expectation),
                confirm: 0,
                user_id,
                date: Timestamp.now(),
            });
            setMessage('Berhasil menambahkan undangan');
        } catch (error) {
            let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
            if (
                error &&
                typeof error === 'object' &&
                'message' in error &&
                typeof error.message === 'string'
            ) {
                console.log(error);
                ErrorMessage = error.message;
            }
            setMessage(ErrorMessage);
            setIsError(true);
        } finally {
            setIsLoading(false);
            formRef.current?.reset();
        }
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        const q = query(
            collection(db, 'invitations'),
            where('user_id', '==', user.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const invitations: InvitationType[] = [];
            querySnapshot.forEach((doc) => {
                invitations.push({
                    ...doc.data(),
                    id: doc.id,
                } as InvitationType);
            });
            setInvitations(
                invitations.sort((a, b) => b.date.seconds - a.date.seconds)
            );
        });

        return unsubscribe;
    }, [user]);

    return (
        <section className='w-full h-full flex flex-col items-center justify-center'>
            <form
                ref={formRef}
                className='container flex flex-col justify-center px-6 py-8 rounded bg-white'
                onSubmit={handleFormSubmit}
            >
                {Message.length > 0 ? (
                    <p
                        className={`${IsError ? 'bg-red-300' : 'bg-green-300'
                            } px-4 py-3 rounded-md mb-4`}
                    >
                        {Message}
                    </p>
                ) : null}
                <div className='w-full flex flex-col mb-2'>
                    <label className='text-sm text-accent mb-1' htmlFor={`id-${id}`}>
                        Id (optional)
                    </label>
                    <input
                        id={`id-${id}`}
                        type='text'
                        placeholder='Masukan id disini'
                        name='id'
                        onChange={(e) => setSlug(e.target.value)}
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                    />
                </div>
                <div className='w-full flex flex-col mb-2'>
                    <label className='text-sm text-accent mb-1' htmlFor={`name-${id}`}>
                        Nama
                    </label>
                    <input
                        id={`name-${id}`}
                        type='text'
                        placeholder='Masukan namamu disini'
                        name='name'
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setExpectation(e.target.value)}
                        className='py-4 px-5 border-accent border-2 rounded-md mb-3'
                    />
                </div>
                <button
                    aria-disabled={IsLoading}
                    className='bg-accent aria-disabled:bg-gray-400 aria-disabled:cursor-wait disabled:cursor-wait disabled:bg-gray-400 border-2 border-accent hover:bg-transparent hover:text-accent transition-all px-4 py-3 rounded-md text-white text-center'
                >
                    Submit
                </button>
            </form>
            <div className='my-4 w-full container'>
                <h2 className='text-white text-xl'>Invitation List</h2>
                <div className='mt-4'>
                    {Invitations.map((invitation) => (
                        <InvitationCard key={invitation.id} invitation={invitation} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FormGenerateInvitation;
