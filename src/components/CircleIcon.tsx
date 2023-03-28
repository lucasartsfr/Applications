import './CircleIcon.css';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import { useState, useContext, useEffect } from 'react';
import useAudio from '../hook/useAudio';
import { MyContext, MyContextType } from '../context';
import useSound from 'use-sound';
import ClickSound from '../assets/sound/open.mp3';
import HoverSound from '../assets/sound/page-change.mp3';
import ScrollContainer from 'react-indiana-drag-scroll'


export default function Icon(){
    
    const [playClickSound] = useSound(ClickSound);
    const [playHoverSound] = useSound(HoverSound);
    const [focus, setFocus] = useState('');
    const { filter, setItem } = useContext(MyContext) as MyContextType;

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
        const response = await fetch('http://api.lucasarts.fr/store/store.json').then((res) => res.json());
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
                animationDelay : (RealIndex*0.1)+"s",
                opacity : 0,
                animationDuration: ".4s",
                animationName: "FadeIn",
            }

            return (
                <div key={icon}  className={`CircleIconBlock ${isFocus} ${Untouchable}`} onMouseEnter={() => playHoverSound()}  onClick={() => MoreInfo(icon)}>
                    <h2 className='CircleIconTitle'>{icon}</h2>
                    <div className="CircleIconData">
                        <div className="CircleIconWrapper">
                            <img className='CircleIcon' src={data[icon].Icon} />
                        </div>
                        <div className="CircleIconDescription">
                            <h3>{data[icon].Title}</h3>
                            <p>{data[icon].Description}</p>
                            <a className='CircleIconButton' target="_blank" href={data[icon].Download}>{data[icon].Button}</a>
                        </div>
                    </div>
                </div>
            );           
        // }
    });

    return(
        <div className='CircleIconContainer'>
            {Icons}
        </div >
    )
}

