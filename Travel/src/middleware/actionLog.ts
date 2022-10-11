import {Middleware} from 'redux'

export const actionLog:Middleware=(store) =>(next)=>(action)=>{
    if (action.type ==='change_language'){

            console.log("current state :"+JSON.stringify(store.getState()))
            console.log("action:"+JSON.stringify(action))
            next(action)
            console.log("updated state:"+JSON.stringify(store.getState()))
            return

    }
        next(action)
}
