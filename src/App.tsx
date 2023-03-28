import './App.css'
import Icon from './components/Icon'
import Header from './components/Header'
import {QueryClient, QueryClientProvider,} from 'react-query'
import Interface from './components/Interface';
import { MyContext, MyContextType } from './context';
import { isMobile } from 'react-device-detect';
import {useContext} from "react";

function App() {

  const queryClient = new QueryClient()
  
  const Mobile = (isMobile) ? "OnMobile" : "OnDesktop";

  const { dark } = useContext(MyContext) as MyContextType;
  
  

  return (
    <QueryClientProvider client={queryClient}>
        <div className="App" id={Mobile} data-theme={dark ? 'dark' : "light"}>
          <Header />
          <Icon />
          <Interface />
          {/* <CircleIcon /> */}
        </div>
    </QueryClientProvider>
  )
}

export default App
