'use client'

import React, { useEffect, useState } from 'react'

const Data = ({ time, type }: { time: string, type: string }) => (
    <div className="text-center text-white">
        <h4 className="text-lg font-sans font-medium md:text-2xl">
            {time}
        </h4>
        <h5 className="text-xs md:text-lg">
            {type}
        </h5>
    </div>
)

const CountDown = () => {
    const [Days, setDays] = useState("00")
    const [Hours, setHours] = useState("00")
    const [Minutes, setMinutes] = useState("00")
    const [Seconds, setSeconds] = useState("00")

    useEffect(() => {
        const countDownDate = new Date("Feb 18, 2024 08:00:00").getTime();

        // Update the count down every 1 second
        const interval = setInterval(function () {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(() => days > 9 ? days.toString() : `0${days}`)
            setHours(() => hours > 9 ? hours.toString() : `0${hours}`)
            setMinutes(() => minutes > 9 ? minutes.toString() : `0${minutes}`)
            setSeconds(() => seconds > 9 ? seconds.toString() : `0${seconds}`)

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {

        }
    }, [])


    return (
        <div className="flex gap-6 justify-center items-center">
            <Data time={Days} type='Hari' />
            <Data time={Hours} type='Jam' />
            <Data time={Minutes} type='Menit' />
            <Data time={Seconds} type='Detik' />
        </div>
    )
}

export default CountDown