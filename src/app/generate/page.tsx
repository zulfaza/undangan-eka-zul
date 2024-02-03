'use client';

import FormGenerateInvitation from '@/lib/components/FormGenerateInvitation';
import AuthProvider, { useAuth } from '@/lib/context/AuthContext';
import React from 'react';

const GenerateInvitation = () => {
    const {
        state: { user },
        actions: { logout, login },
    } = useAuth();
    return (
        <main className='bg-[#161d28] w-full h-full min-h-screen flex items-center justify-center'>
            {!user ? (
                <button className='bg-blue-400 hover:bg-blue-300 text-white transition-colors px-3 py-2 rounded w-fit' onClick={login}>Login</button>
            ) : (
                <section className='w-full'>
                    <div className='container my-4 flex justify-center px-6 py-2 rounded'>
                        <button className='bg-blue-400 hover:bg-blue-300 text-white transition-colors px-3 py-2 rounded w-fit' onClick={logout}>Logout</button>
                    </div>
                    <FormGenerateInvitation />
                </section>
            )}
        </main>
    );
};

const GenerateInvitationWrapper = () => (
    <AuthProvider>
        <GenerateInvitation />
    </AuthProvider>
);

export default GenerateInvitationWrapper;
