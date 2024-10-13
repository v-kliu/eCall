'use client'

import { useEffect, useRef, useState } from 'react';

type Data = {
  city: string;
  country: string;
  number: string;
};

export default function calling() {

  let region = "Jakarta";
  let country = "IDN";
  let number = "112";
  let countdown = 3;
  let timerId: NodeJS.Timeout;
  const countdownDisplay = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    timerId = setInterval(tickTimer, 1000);


    const fetchData = async () => {
      const res = await fetch('https://e-call-cebb9bb9b3b7.herokuapp.com/data');
      const jsonData = await res.json();
      setData(jsonData);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let region = data?.city;
    let country = data?.country;
    let number = data?.number;

  }, [data]);


  const tickTimer = () => {
    countdown--;
    if (countdownDisplay.current)
      countdownDisplay.current.textContent = countdown.toString();
    if (countdown === 0) {
      console.log("MAKE CALL");
      clearInterval(timerId);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <main className="relative border border-solid border-white h-[844px] w-[390px] rounded-[30px] flex flex-col justify-evenly">
        <div className="w-[225px] h-[25px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] left-[50%] top-0
          rounded-b-[15px] flex items-center justify-center">
          <div className="relative w-[75px] h-[10px] bg-background rounded-lg mr-[20px]"/>
          <div className="relative w-[10px] h-[10px] bg-background rounded-[100%]"/>
        </div>
        <div className="mx-auto">
          <h1 className="m-auto text-[60pt] text-center font-inter font-semibold mb-[5%]">CALLING HELP</h1>
          <div className="w-[80%] mx-auto text-xl text-center font-semibold font-inter flex justify-evenly">
            <h2>{data?.city}, {data?.country}</h2><h2> - </h2><h2>{data?.number}</h2>
          </div>
        </div>
        <h1 ref={countdownDisplay} className="text-[200pt] text-center  font-bold leading-none">3</h1>
        <div className="w-[150px] h-[5px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] bottom-[2%] left-[50%]
          rounded-[15px] flex items-center justify-center"/>
      </main>
    </div>
  )
}