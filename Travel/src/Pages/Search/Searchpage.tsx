import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import {useParams,useLocation} from  'react-router-dom'
import {FilterArea,ProductList} from './components'
import {getSearchData} from './RTK/slice'
import {useDispatch,useSelector} from '../../redux/hooks'
import { Spin } from "antd";
import {MianLayout} from '../../layout/'

type MatchParams = {
  keywords: string;
}

export const SearchPage: React.FC = () => {
    const {keywords}=useParams<MatchParams>()
    const location = useLocation();
    const dispatch=useDispatch()
    const loading=useSelector((state) => state.productsSearch.loading)
    const error = useSelector((state) => state.productsSearch.error);
    const pagination = useSelector((state) => state.productsSearch.pageNation);
    const productList = useSelector((state) =>  state.productsSearch.data);
    const search= useSelector((state) =>  state.productsSearch.search);


    useEffect(() =>{
        dispatch(getSearchData({keyword:keywords as string,nextPage:1,pageSize:10}))

    },[location])

    const onPageChange=(nextPage, pageSize)=>{

            dispatch(getSearchData({keyword:keywords as string, pageSize, nextPage}))


    }

    if (!loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }
    if (error) {
        return <div>website error：{error}</div>;
    }
    return(
        <MianLayout>
                <div className={styles['product-list-container']} style={{marginLeft:"25px"}}>
                    <FilterArea />
                </div>

                <div className={styles['product-list-container']} >
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            <p>{search}</p>
            <p>(This is the keyword returned by the backend to prove that different keywords can search different pages)</p>
        </MianLayout>
    )
};
