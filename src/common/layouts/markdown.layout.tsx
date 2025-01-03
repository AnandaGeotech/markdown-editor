import React from 'react';
import { Outlet } from 'react-router-dom';
import { ItemProvider } from '../contexts/markdown.context';
import MarkdownHeader from '@/features/markdown/components/header';

const MarkdownLayout = () => (
  <ItemProvider>

    <MarkdownHeader />
    <Outlet />
  </ItemProvider>
);

export default MarkdownLayout;
