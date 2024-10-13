'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import callPhone from "/public/call-phone.png"


type Data = {
  city: string;
  country: string;
  number: string;
};

export default function calling() {

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


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


  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <main className="relative border-[5px] border-solid border-white h-[844px] w-[390px] rounded-[30px] flex flex-col justify-evenly bg-[url('/call-bg.jpeg')]">

        <div className="w-[225px] h-[25px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] left-[50%] top-0
          rounded-b-[15px] flex items-center justify-center">
          <div className="relative w-[75px] h-[10px] bg-background rounded-lg mr-[20px]"/>
          <div className="relative w-[10px] h-[10px] bg-background rounded-[100%]"/>
        </div>

        <section className="h-[80%] w-full flex flex-col justify-between items-center">
          <h1 className="text-7xl mx-auto mt-[15%]">{data?.number}</h1>
          <div className="w-[90%] h-[30%] flex flex-col justify-evenly items-center">
            <div className="flex justify-evenly w-full">
              <div className="w-[75px] h-[75px] rounded-[100%] bg-foreground"></div>
              <div className="w-[75px] h-[75px] rounded-[100%] bg-gray-900"></div>
              <div className="w-[75px] h-[75px] rounded-[100%] bg-gray-900"></div>
            </div>
            <div className="flex justify-evenly w-full">
              <div className="w-[75px] h-[75px] rounded-[100%] bg-gray-900"></div>
              <div className="w-[75px] h-[75px] rounded-[100%] bg-red">
                <Image src={callPhone} alt="call icon"/>
              </div>
              <div className="w-[75px] h-[75px] rounded-[100%] bg-gray-900"></div>
            </div>
          </div>
        </section>


        <div className="w-[150px] h-[5px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] bottom-[2%] left-[50%]
          rounded-[15px] flex items-center justify-center"/>
      </main>
    </div>
  )
}