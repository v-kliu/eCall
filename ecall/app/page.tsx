"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import phone from "/public/phone.png";
import fire from "/public/fire.png";
import med from "/public/med.png";
import police from "/public/police.png";
import { useRef, useEffect, useState } from 'react';

export default function Home() {

  let timerId: NodeJS.Timeout;
  let startTime = 0, elapsedTime = 0, running = false;
  const progressBar = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const holdTime = 1500;

  useEffect(() => {
    document.documentElement.style.setProperty(`--progress`, `0deg`);
  }, [])

  const handleMouseDown = () => {
    startTimer();
    timerId = setTimeout(() => {
      router.push(`/call`);
      stopTimer();
    }, holdTime);
    document.documentElement.style.setProperty(`--progress1`, `0deg`);
    // timerId = setInterval(() => {
    //   elapsedTime += 5;
    //   if (elapsedTime === holdTime) {
    //     clearInterval(timerId);
    //     elapsedTime = 0;
    //     router.push(`/call`);
    //     clearInterval(timerId);
    //   }
    //   console.log(elapsedTime);
    //   playProgressBarAnimation();
    // }, 5);
  }

  const handleMouseUp = () => {
    stopTimer();
    // clearInterval(timerId);
    elapsedTime = 0;
    clearTimeout(timerId);
    document.documentElement.style.setProperty(`--progress1`, `0deg`);
  }

  function playProgressBarAnimation() {
    let deg = elapsedTime / holdTime * 360;
    document.documentElement.style.setProperty(`--progress1`, `${deg}deg`);
  }

  function startTimer() {
    startTime = performance.now();
    running = true;
    updateTimer();
  }

  function updateTimer() {
    if (!running) return;
    elapsedTime = performance.now() - startTime;
    playProgressBarAnimation();
    requestAnimationFrame(updateTimer);
  }

  function stopTimer() {
    running = false;
    elapsedTime = 0;
  }

  const handleMouseDown2 = () => {
    timerId = setInterval(() => {
      elapsedTime += 5;
      if (elapsedTime === holdTime) {
        clearInterval(timerId);
        elapsedTime = 0;
        router.push(`/call`);
        clearInterval(timerId);
      }
      playProgressBarAnimation2();
    }, 5);
  }

  const handleMouseUp2 = () => {
    clearInterval(timerId);
    elapsedTime = 0;
    document.documentElement.style.setProperty(`--progress2`, `0deg`);
  }

  function playProgressBarAnimation2() {
    let deg = elapsedTime / holdTime * 360;
    document.documentElement.style.setProperty(`--progress2`, `${deg}deg`);
  }

  const handleMouseDown3 = () => {
    timerId = setInterval(() => {
      elapsedTime += 5;
      if (elapsedTime === holdTime) {
        clearInterval(timerId);
        elapsedTime = 0;
        router.push(`/call`);
        clearInterval(timerId);
      }
      playProgressBarAnimation3();
    }, 5);
  }

  const handleMouseUp3 = () => {
    clearInterval(timerId);
    elapsedTime = 0;
    document.documentElement.style.setProperty(`--progress3`, `0deg`);
  }

  function playProgressBarAnimation3() {
    let deg = elapsedTime / holdTime * 360;
    document.documentElement.style.setProperty(`--progress3`, `${deg}deg`);
  }

  const handleMouseDown4 = () => {
    timerId = setInterval(() => {
      elapsedTime += 5;
      if (elapsedTime === holdTime) {
        clearInterval(timerId);
        elapsedTime = 0;
        router.push(`/call`);
        clearInterval(timerId);
      }
      playProgressBarAnimation4();
    }, 5);
  }

  const handleMouseUp4 = () => {
    clearInterval(timerId);
    elapsedTime = 0;
    document.documentElement.style.setProperty(`--progress4`, `0deg`);
  }

  function playProgressBarAnimation4() {
    let deg = elapsedTime / holdTime * 360;
    document.documentElement.style.setProperty(`--progress4`, `${deg}deg`);
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <main className="relative border-[5px] border-solid border-white h-[844px] w-[390px] rounded-[30px] flex flex-col justify-center items-center">
        <div className="w-[225px] h-[25px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] left-[50%] top-0
          rounded-b-[15px] flex items-center justify-center">
          <div className="relative w-[75px] h-[10px] bg-background rounded-lg mr-[20px]"/>
          <div className="relative w-[10px] h-[10px] bg-background rounded-[100%]"/>
        </div>
        <div ref={progressBar} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
              className="progress-bar flex h-[325px] w-[325px] bg-red rounded-[22.5px] mb-[25%]"> {/* PROGRESS BAR */}
          <div className="flex m-auto h-[315px] w-[315px] bg-background rounded-[17.5px]"> {/* GAP */}
            <div className="bg-red h-[300px] w-[300px] rounded-[10px] m-auto drop-shadow-4xl
              flex flex-col justify-evenly items-center">
              <h2 className="text-[1.5rem] font-inter leading-none tracking-wider font-semibold">HOLD</h2>
              <Image className="w-[150px] h-[150px]" src={phone} alt="call icon"/>
              <div className="text-[4rem] flex justify-evenly w-[60%] font-inter font-semibold leading-none">
                <h1>S</h1><h1>O</h1><h1>S</h1>
              </div>
            </div>
          </div> {/* GAP CLOSE */}
        </div> {/* PROGRESS BAR CLOSE */}

        <section className="flex flex-col justify-center">
          <div className="font-semibold font-inter text-center flex justify-evenly items-center mb-[5%]">
            <div className="w-[30%] h-[2px] bg-foreground"/>
              SPECIFY
            <div className="w-[30%] h-[2px] bg-foreground"/>
          </div>
          <div className="flex justify-evenly">
            <div ref={progressBar} onMouseDown={handleMouseDown2} onMouseUp={handleMouseUp2} onMouseLeave={handleMouseUp2}
                  className="progress-bar-2 flex m-auto h-[100px] w-[100px] bg-red rounded-[22.5px]"> {/* PROGRESS BAR */}
              <div className="flex m-auto h-[90px] w-[90px] bg-background rounded-[17.5px]"> {/* GAP */}
                <div className="bg-red h-[75px] w-[75px] rounded-[10px] m-auto drop-shadow-4xl
                  flex flex-col justify-evenly items-center">
                  <Image className="w-[50px] h-[50px]" src={fire} alt="call icon"/>
                  <div className="text-[1rem] flex justify-evenly w-[60%] font-inter font-semibold leading-none">
                    <h1>F</h1><h1>I</h1><h1>R</h1><h1>E</h1>
                  </div>
                </div>
              </div> {/* GAP CLOSE */}
            </div> {/* PROGRESS BAR CLOSE */}

            <div ref={progressBar} onMouseDown={handleMouseDown3} onMouseUp={handleMouseUp3} onMouseLeave={handleMouseUp3}
                  className="progress-bar-3 flex m-auto h-[100px] w-[100px] bg-red rounded-[22.5px]"> {/* PROGRESS BAR */}
              <div className="flex m-auto h-[90px] w-[90px] bg-background rounded-[17.5px]"> {/* GAP */}
                <div className="bg-red h-[75px] w-[75px] rounded-[10px] m-auto drop-shadow-4xl
                  flex flex-col justify-evenly items-center">
                  <Image className="w-[50px] h-[50px]" src={med} alt="call icon"/>
                  <div className="text-[1rem] flex justify-evenly w-[60%] font-inter font-semibold leading-none">
                    <h1>M</h1><h1>E</h1><h1>D</h1>
                  </div>
                </div>
              </div> {/* GAP CLOSE */}
            </div> {/* PROGRESS BAR CLOSE */}

            <div ref={progressBar} onMouseDown={handleMouseDown4} onMouseUp={handleMouseUp4} onMouseLeave={handleMouseUp4}
                  className="progress-bar-4 flex m-auto h-[100px] w-[100px] bg-red rounded-[22.5px]"> {/* PROGRESS BAR */}
              <div className="flex m-auto h-[90px] w-[90px] bg-background rounded-[17.5px]"> {/* GAP */}
                <div className="bg-red h-[75px] w-[75px] rounded-[10px] m-auto drop-shadow-4xl
                  flex flex-col justify-evenly items-center">
                  <Image className="w-[50px] h-[50px]" src={police} alt="call icon"/>
                  <div className="text-[1rem] flex justify-evenly w-[80%] font-inter font-semibold leading-none">
                    <h1>P</h1><h1>O</h1><h1>L</h1><h1>I</h1><h1>C</h1><h1>E</h1>
                  </div>
                </div>
              </div> {/* GAP CLOSE */}
            </div> {/* PROGRESS BAR CLOSE */}
          </div>
        </section>

        <div className="w-[150px] h-[5px] bg-foreground absolute bg-blue-500 transform -translate-x-[50%] bottom-[2%] left-[50%]
          rounded-[15px] flex items-center justify-center"/>
      </main>
    </div>
  );
}
