import React, { useState } from 'react';
import { Layout } from '@/components/Layout/Layout'
import TestLink from './component';

const pageNum = 0
const pageName = "test" + pageNum

const TopPage = () => {
    return (
        <Layout pageName={pageName} isSignin={false}>
            <TestLink thisPageNum={pageNum} />
        </Layout>
    );
};
export default TopPage;
