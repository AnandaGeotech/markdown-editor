import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarkdownProvider } from '../contexts/markdown.context';
import MarkdownHeader from '@/features/markdown/components/header';

const MarkdownLayout = () => (
  <MarkdownProvider>

    <MarkdownHeader />
    <Outlet />
  </MarkdownProvider>
);

export default MarkdownLayout;
