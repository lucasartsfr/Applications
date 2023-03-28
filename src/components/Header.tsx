import './Header.css'
import { MyContext, MyContextType } from '../context';
import { useContext } from 'react';
import {BsFillVolumeDownFill as Sound} from 'react-icons/bs';
import {BsFillVolumeMuteFill as Mute} from 'react-icons/bs';
import {MdDarkMode as Dark} from 'react-icons/md';
import {MdLightMode as Light} from 'react-icons/md';
import useSound from 'use-sound';

export default function Header(){
    
    
    const { item, sound, setSound, dark, setDark } = useContext(MyContext) as MyContextType;
    const [playClickSound] = useSound("/sound/Eshop.mp3", { soundEnabled : sound});
    const [PlayDarkMode] = useSound("/sound/Klick.mp3", { soundEnabled : sound});

    const ToogleDark = () =>{
        setDark(prev => !prev);
        PlayDarkMode();
    }

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
                {dark ? <Dark className='Theme' onClick={ToogleDark}/> : <Light className='Theme' onClick={ToogleDark}/>}
            </div>
        </div>
    )
}