import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC, ReactNode } from 'react'
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string;
    children: ReactNode
}


export const Layout:FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{title}</title>
        </Head>
          <Navbar />
          <Sidebar />
        <Box sx={{ padding: '10mpx 20px'  }}>
            { children }
        </Box>
    </Box>
  )
}

export default Layout