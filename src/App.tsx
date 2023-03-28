import './App.css'
import Icon from './components/Icon'
import Header from './components/Header'
import {QueryClient, QueryClientProvider,} from 'react-query'
import Interface from './components/Interface';
import { MyContextProvider } from './context';

import { isMobile } from 'react-device-detect';

function App() {

  const queryClient = new QueryClient()
  
  const Mobile = (isMobile) ? "OnMobile" : "OnDesktop";

  return (
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <div className="App" id={Mobile}>
          <Header />
          <Icon />
          <Interface />
          {/* <CircleIcon /> */}
        </div>
      </MyContextProvider>
    </QueryClientProvider>
  )
}

export default App
