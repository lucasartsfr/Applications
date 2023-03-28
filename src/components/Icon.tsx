import './Icon.css';
import { useQuery } from 'react-query'
import { useState, useContext, useRef } from 'react';
import { MyContext, MyContextType } from '../context';
import useSound from 'use-sound';
import ScrollContainer from 'react-indiana-drag-scroll'


export default function Icon(){

    const { filter, setItem, sound } = useContext(MyContext) as MyContextType;
    const [playClickSound] = useSound("/sound/open.mp3", { soundEnabled : sound});
    const [playHoverSound] = useSound("/sound/page-change.mp3", { soundEnabled : sound});
    const [focus, setFocus] = useState('');
    const ScrollRef = useRef();
    

    // Type for Fetch Data
    interface IconData {
        Icon: string;
        Download: string;
        Description: string;
        Title: string;
        Button : string;
        Type : string
    }
    
    // Inside Loop
    interface Data {
        [key: string]: IconData;
    }
   
    
    
    
    const { isLoading, error, data } = useQuery('icones', async () => {
        const response = await fetch('https://api.lucasarts.fr/store/store.json').then((res) => res.json());
        setItem(Object.keys(response).length);
        return response
        }
    );


    if (isLoading) return <div className='IconContainer Loading'></div>;

    if (error) return <div className='IconContainer'>Error</div>;

   

    // On Click on Item
    const MoreInfo = (icon:string) => {     
        icon == focus ? setFocus('Star') : setFocus(icon); // Add Class     
        playClickSound() // Play Sound
        setTimeout(() => {
            document.getElementById(icon)?.scrollIntoView({ behavior: "smooth", inline: "center" });
        }, 300)       
    }   
   // Entries is not Safe   
   let RealIndex = 0;
    const Icons: (JSX.Element | undefined)[] = Object.keys(data).map((icon:string, index:number) => {
        const isFocus = (focus == icon) ? "active" : "notactive";
        // if(data[icon].Type == filter || filter == ""){
            // Grey Item
            const Untouchable = (data[icon].Type.includes(filter) || filter == "Star") ? "" : "untouchable"
            // Index for Animation
            RealIndex +=1;
            // Create Animation 
            const Animation = {
                animationDelay : (RealIndex*.2)+"s",
                opacity : 0,
                animationDuration: "1s",
                animationName: "FadeIn",
            }

            return (
                <div key={icon} style={Animation} id={icon} className={`IconBlock ${isFocus} ${Untouchable}`} onMouseEnter={() => playHoverSound()}  onClick={() => MoreInfo(icon)}>
                    <h2 className='IconTitle'>{icon}</h2>
                    <div className="IconData">
                        <div className="IconWrapper">
                            <img className='Icon' src={data[icon].Icon} />
                        </div>
                        <div className="IconDescription">
                            <h3>{data[icon].Title}</h3>
                            <p>{data[icon].Description}</p>
                            <a className='IconButton' target="_blank" href={data[icon].Download}>{data[icon].Button}</a>
                        </div>
                    </div>
                </div>
            );           
        // }
    });

    return(
        <ScrollContainer  className='IconContainer'>
            {Icons}
        </ScrollContainer >
    )
}

