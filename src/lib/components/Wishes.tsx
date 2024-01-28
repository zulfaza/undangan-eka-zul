import { format } from 'date-fns/format';
import React from 'react'

const Wishes = async () => {
    const wishes: {
        id: string;
        message: string;
        name: string;
        date: {
            seconds: number,
            nanoseconds: number
        },
    }[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wish`, {
        next: {
            tags: ['wish']
        },
        cache: 'no-store'
    }).then(res => res.json()).then(res => res.data);

    return (
        <div className='container mt-4'>
            <div className='w-full h-full max-h-[500px] overflow-y-auto flex gap-4 flex-wrap'>
                {wishes.map(({ id, name, message, date }) =>
                    <div className='border border-accent rounded-md p-4 w-full' id={`wish-${id}`} key={id}>
                        <div className='flex justify-between items-center mb-4'>
                            <h4 className='font-sans font-bold text-xl text-accent border-b-2 border-accent'>{name}</h4>
                            <h6>{format(new Date(date.seconds * 1000), 'd MMM, HH:mm')}</h6>
                        </div>
                        <p>&quot;{message}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishes