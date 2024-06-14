import React from 'react'
import store from "./store"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes ,  } from 'react-router-dom'
import Rutas from './Routes'



function App() {



  return (
    <Provider store={store}>
      <BrowserRouter>
        <Rutas/>
      </BrowserRouter>
    </Provider> 

  )
}

export default App