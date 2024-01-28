'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import GiftBox from '@/lib/lottie/GiftBox.json'

type BankCardProps = {
    image: string,
    name: string,
    bank_number: string;
}

const BankCard = ({ image, bank_number, name }: BankCardProps) => {
    function copyToClipboard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) {
        const target = e.target as HTMLButtonElement;
        navigator.clipboard.writeText(text);
        target.textContent = 'Copied!!';
        setTimeout(() => {
            target.textContent = 'Copy';
        }, 500)
    }
    return (
        <div className='py-5 px-10 rounded-lg bg-white bg-opacity-50 border-2 border-gray-300 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 md;gap-10'>
            <div>
                <Image src={image} alt='logo bank' width={100} height={100} />
            </div>
            <div className='font-sans text-accent text-center md:text-right'>
                <h4 className='text-sm'>A/N</h4>
                <h3 className='text-xl mb-1'>{name}</h3>
                <h2 className='text-2xl mb-3'>{bank_number}</h2>
                <button onClick={(e) => copyToClipboard(e, bank_number)} className='py-2 px-4 text-xs rounded bg-accent bg-opacity-75 text-white'>
                    Copy
                </button>
            </div>
        </div>
    )
}

const WeddingGift = () => {
    const [OpenWeddingGift, setOpenWeddingGift] = useState(false)
    const toggleWeddingGift = () => {
        setOpenWeddingGift(prev => !prev)
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <button onClick={toggleWeddingGift} className="px-5 py-1 rounded-md text-white bg-accent bg-opacity-100 hover:bg-opacity-80 transition-colors">
                Klik disini
            </button>
            <div className={`${OpenWeddingGift ? 'max-h-[1000px] mt-10' : 'max-h-0'} h-full overflow-hidden flex flex-col gap-6 duration-1000 transition-all`}>
                <BankCard
                    image='/images/Logo-Bank-BRI.png'
                    name='Zul Faza Makarima'
                    bank_number='010701080972504'
                />
                <BankCard
                    image='/images/Logo-Bank-BCA.webp'
                    name='Zul Faza Makarima'
                    bank_number='8180408852'
                />
                <div className='py-5 px-10 text-accent font-medium font-sans rounded-lg bg-white bg-opacity-50 border-2 border-gray-300 '>
                    <h3 className='text-lg text-center mb-3'>Kirim Hadiah</h3>
                    <div className='flex items-center flex-col md:flex-row gap-5 md:gap-10 md:justify-between'>
                        <div>
                            <Player
                                autoplay
                                loop
                                src={GiftBox}
                            />
                        </div>
                        <div className='font-sans text-accent text-right'>
                            <div className='flex w-full justify-end gap-10'>
                                <div>
                                    <h3 className='text-sm mb-px'>No Telp</h3>
                                    <h2 className='text-lg mb-2'>089666598792</h2>
                                </div>
                                <div>
                                    <h3 className='text-sm mb-px'>Nama</h3>
                                    <h2 className='text-lg mb-2'>Eka Rahayu</h2>
                                </div>
                            </div>
                            <div>
                                <h3 className='text-sm mb-px'>Alamat</h3>
                                <h2 className='text-lg mb-2'>Blok Pasar  lama RT 07 RW 02 Des. Plumbon Kec. Plumbon Kab. Cirebon</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeddingGift