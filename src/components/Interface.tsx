import './interface.css'
import {useContext} from "react";
import {DiAndroid as Android} from 'react-icons/di';
import {DiApple as Apple} from 'react-icons/di';
import { HiComputerDesktop as Desktop}  from 'react-icons/hi2';
import { AiFillStar as Star}  from 'react-icons/ai';
import { MyContext, MyContextType } from '../context';
import useSound from 'use-sound';


export default function Interface(){

    const { setFilter, filter, sound } = useContext(MyContext) as MyContextType;
    const [playClickSound] = useSound("/sound/Bing.mp3", { soundEnabled : sound});
    const [playHoverSound] = useSound("/sound/page-change.mp3", { soundEnabled : sound});


    const ApplyFilter = (e:any) => {
        setFilter(e.currentTarget.id);
        playClickSound()
    }

    // Interface for button
    interface Buttons {
        [key :string] : {
            IconTag : JSX.Element
        }
    }
    // Button List    
    const Buttons :Buttons = {
        Star : {
            IconTag :  <Star color='#ffd642'/>
        },
        Android : {
            IconTag :  <Android color='#a4c639'/>
        },
        Apple : {
            IconTag :  <Apple color='#A2AAAD'/>
        },
        Desktop : {
            IconTag : <Desktop color='#f24e5a'/>
        }
    }

    const ButtonsGenerator :JSX.Element[] = Object.keys(Buttons).map((item:string) => {
        const Focus = (item == filter) ? "focus" : "";
        return(
            <div key={item} className={`InterfaceContainer ${Focus}`} id={item} onClick={ApplyFilter} onMouseEnter={() => playHoverSound()}>
                {Buttons[item].IconTag}
            </div>
        )
    })

    return(
        <div className="Interface">
            {ButtonsGenerator}
        </div>
    )
}