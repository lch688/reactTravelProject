import React ,{useEffect,useState}from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo.svg'
import {Layout,Typography,Input,Menu,Button,Dropdown} from 'antd'
import { GlobalOutlined } from "@ant-design/icons";
import {Link,useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {useSelector} from  '../../redux/hooks'
import jwtDecode ,{JwtPayload} from  'jwt-decode'
import {LoginSlice} from  '../../Pages/Login/RTK/slice'
import axios, {AxiosError} from "axios";
import {HeaderSlice} from  './RTK/slice'



interface JwtdecodePayload extends  JwtPayload{
    username:string;
}

export const Header: React.FC = () =>{



    axios.interceptors.response.use((res) =>{
        return res
    },(error:AxiosError) =>{

        if ( error.response?.status === 401){

            dispatch(LoginSlice.actions.logout())
            navigate('/login')
        }
        return Promise.reject(error)
    })








    const language=useSelector((state) =>state.HeaderData.language)
    const languagelist=useSelector((state) =>state.HeaderData.languageList)
    const dispatch=useDispatch()
    const { t } = useTranslation()
    const navigate=useNavigate()

    const jwt=useSelector((state) =>state.Login.token)
    const [username,setUsername]=useState<string>("")

    const shoppingitems=useSelector((state) =>state.ShoppingCart.item)

    const Shoppingloading=useSelector((state) =>state.ShoppingCart.loading)


    useEffect(() =>{

        if (jwt){

            const token=jwtDecode<JwtdecodePayload>(jwt)
            setUsername(token.username)



        }
    },[jwt])
    const handleLogout=() =>{
        dispatch(LoginSlice.actions.logout())
        navigate('/')

    }

    const handlelanguagechange=(e) =>{
        dispatch(HeaderSlice.actions.changelanuage(e.key))

    }

        return(
            <div>
                <div className={style['top-header']}>
                    <div className={style.inner}>
                        <div className={style['top-header-wraper']}>
                            <Typography.Text>{t("header.slogan")}</Typography.Text>
                            <Dropdown.Button
                                style={{ marginLeft: 15 }}
                                overlay={
                                    <Menu
                                        onClick={handlelanguagechange}
                                        items={
                                            languagelist.map(item=>{

                                                return {key:item.code,label:item.name}
                                            })

                                        }

                                    />
                                }
                                icon={<GlobalOutlined />}
                            >
                                {
                                    language ==="en" ?'English':'中文'
                                }
                            </Dropdown.Button>
                        </div>
                        {jwt?(
                            <Button.Group className={style["button-group"]}>
                                <span style={{marginRight:"10px"}}>
                                    {t("header.welcome")}
                                    <Typography.Text strong>{username}</Typography.Text>
                                </span>
                                <Link to='/shoppingcar'>
                                    <Button loading={Shoppingloading}>
                                        {t("header.shoppingcart")}({
                                        shoppingitems.length})
                                    </Button>
                                </Link>


                                <Button onClick={handleLogout}>{t("header.logout")}</Button>


                            </Button.Group>
                        ):(<Button.Group className={style["button-group"]}>
                            <Link to='/register'>
                                <Button>{t("header.register")}</Button>
                            </Link>

                            <Link to='/login'>
                                <Button>{t("header.Login")}</Button>
                            </Link>

                        </Button.Group>)}


                    </div>
                </div>



                <div  className={style['app-header-wraper']}>
                    <Layout.Header className={style['app-header']}>
                        <img src={logo} className={style['App-logo']} />
                        <Link to={'/'}>
                            <Typography.Title  className={style.title} level={3}>{t("header.title")}</Typography.Title>
                        </Link>

                        <Input.Search
                            className={style['search-input']}
                            placeholder={t("header.placeholder")}
                            onSearch={(keyword) =>navigate("/search/"+keyword)}
                        />

                    </Layout.Header>
                    <div>

                        <Menu
                            mode={"horizontal"}
                            className={style["main-menu"]}
                            items={[
                                { key: "1", label: t("header.home_page") },
                                { key: "2", label: t("header.weekend") },
                                { key: "3", label: t("header.group") },
                                { key: "4", label: t("header.backpack") },
                                { key: "5", label: t("header.private") },
                                { key: "6", label: t("header.cruise") },
                                { key: "7", label: t("header.hotel") },
                                { key: "8", label: t("header.local") },
                                { key: "9", label: t("header.theme") },
                                { key: "10", label: t("header.custom") },
                                { key: "11", label: t("header.study") },
                                { key: "12", label: t("header.visa") },
                                { key: "13", label: t("header.enterprise") },
                                { key: "14", label: t("header.high_end") },
                                { key: "15", label: t("header.outdoor") },

                            ]}
                        />
                    </div>

                </div>

            </div>
        )



}

