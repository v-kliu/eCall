'use client'

import { useEffect, useRef } from 'react';

export default function calling() {

  let region = "Jakarta";
  let country = "IDN";
  let number = "112";
  let countdown = 3;
  let timerId: NodeJS.Timeout;
  const countdownDisplay = useRef<HTMLInputElement>(null);

  useEffect(() => {
    timerId = setInterval(tickTimer, 1000);
    makeRequest();
  }, []);

  async function makeRequest() {
    let url = "/data"; // some requests require parameters
    try {
      let result = await fetch(url)
      await statusCheck(result)
      // result = await result.text()) // use this if your data comes in text
      result = await result.json() // or this if your data comes in JSON
      processData(result)
    } catch(err) {
      handleError(err); // define a user-friendly error-message function
    }
  }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  function handleError(err) {
    console.error(err);
  }

  function processData(result) {
    console.log(result);
  }

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
          <div className="w-[80%] mx-auto text-2xl text-center font-semibold font-inter flex justify-evenly">
            <h2>{region}, {country}</h2><h2> - </h2><h2>{number}</h2>
          </div>
        </div>
        <h1 ref={countdownDisplay} className="text-[200pt] text-center  font-bold leading-none">3</h1>
        <div className="w-[150px] h-[5px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] bottom-[2%] left-[50%]
          rounded-[15px] flex items-center justify-center"/>
      </main>
    </div>
  )
}