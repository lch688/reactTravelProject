import React from 'react'
import styles from "./mainLayout.module.css";
import { Header,Footer } from "../../publiComponets";


interface props{
    children:React.ReactNode
}

export const MianLayout:React.FC<props> =({children}) =>{

    return(
        <>
            <Header />
                <div className={styles['page-content']}>
                    {children}
                </div>
            <Footer />
        </>
    )
}