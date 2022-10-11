import React,{Component,useEffect} from 'react';
import {HomePage,Login,Rigster,Detail,SearchPage,ShoppingCart,PlaceOrder} from './Pages'
import {BrowserRouter, Route, Routes, Navigate,HashRouter} from 'react-router-dom'
import {useSelector,useDispatch} from "./redux/hooks";
import {getShoppingCartData} from  './Pages/ShoppingCart/RTK/slice'


const PrivateRouter=({children}) =>{
    const jwt=useSelector(state =>state.Login.token )
    return jwt ? children:<Navigate to='/login' />
}




function App() {

    const jwt=useSelector(state =>state.Login.token )
    const dispatch=useDispatch()

    useEffect(() =>{
        if (jwt){
            dispatch(getShoppingCartData(jwt))
        }
    },[jwt])



    return(
        <div>
           
                <BrowserRouter>

                    <Routes>
                       
                        <Route path='/'  element={<HomePage />} />

                        <Route path='/login'  element={<Login />}  />

                        
                        <Route path='/register'  element={<Rigster />}  />

                        <Route path='/detail/:routeId'  element={ <Detail />}  />

                        <Route path='/search'  element={ <SearchPage />}  >
                            <Route path=':keywords'  element={ <SearchPage />}/>
                        </Route>


                        <Route path='/shoppingcar'
                               element={
                               <PrivateRouter>
                                   <ShoppingCart />
                               </PrivateRouter>
                               }
                           />

                        <Route path='/placeorder'
                               element={
                                   <PrivateRouter>
                                       <PlaceOrder />
                                   </PrivateRouter>
                               }
                        />
                        <Route path='*'  element={
                         <div>404</div>
                          
                         } />


                    </Routes>

                </BrowserRouter>


        </div>
        
      )


}

export default App;
