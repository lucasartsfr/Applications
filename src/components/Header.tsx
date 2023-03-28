import './Header.css'
import { MyContext, MyContextType } from '../context';
import { useState, useContext, useEffect } from 'react';
import {CiBatteryFull as Battery} from 'react-icons/ci'
import {BsFillVolumeDownFill as Sound} from 'react-icons/bs';
import {BsFillVolumeMuteFill as Mute} from 'react-icons/bs';
import useSound from 'use-sound';
import ClickSound from '../assets/sound/Eshop.mp3';

export default function Header(){
    
    
    const { item, sound, setSound } = useContext(MyContext) as MyContextType;
    const [playClickSound] = useSound(ClickSound, { soundEnabled : sound});

    return(
        <div className="Header">
            
                <div className='UserIconContainer'>
                    <a href='https://lucasarts.fr' target="_blank" onClick={() => playClickSound()}>
                        <img className='UserIcon' src='http://theme.lucasarts.fr/user.jpg' alt='Lucas Pires' />
                    </a>
                </div>
            <div className='Right'>
                <span>{item} Applications</span>
                {/* <Battery /> */}
                {sound ? <Sound className='Sound' onClick={() => setSound(false)}/> : <Mute className='Sound' onClick={ () => setSound(true)}/>}
            </div>
        </div>
    )
}