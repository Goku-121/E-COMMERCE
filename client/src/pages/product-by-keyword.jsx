import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';

const ProductByKeyword = () => {
    const { ListByKeywordRequest, SetSearchKeyword } = ProductStore();
    const { keyword } = useParams();

    useEffect(() => {
        if (keyword) {
            SetSearchKeyword(keyword);
            ListByKeywordRequest(keyword);
        }
    }, [keyword]);

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;