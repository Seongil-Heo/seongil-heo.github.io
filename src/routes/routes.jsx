import React from 'react';

const Home = React.lazy(() => import('@/pages/Home'));
const People = React.lazy(() => import('@/pages/People'));
const Research = React.lazy(() => import('@/pages/Research'));
const Publications = React.lazy(() => import('@/pages/Publications'));
const Videos = React.lazy(() => import('@/pages/Videos'));
const News = React.lazy(() => import('@/pages/News'));


export const routes = [
  { path: '/', element: Home },
  { path: '/people', element: People, title: "People" },
  { path: '/research', element: Research, title: "Research" },
  { path: '/publications', element: Publications, title: "Publications" },
  { path: '/videos', element: Videos, title: "Videos" },
  { path: '/news', element: News,title: "News" },
];
