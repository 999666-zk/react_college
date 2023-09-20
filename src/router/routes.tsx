import AppLayout from '../layout/layout'
import { LazyImportComponent } from './LazyImportComponent'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../pages/home'))
const HelpDocs = lazy(() => import('../pages/help-docs'))
const BestPractices = lazy(() => import('../pages/best-practices'))
const RecentUpdate = lazy(() => import('../pages/recent-update'))
const QflowCollege = lazy(() => import('../pages/qflow-college'))
const QflowSearch = lazy(() => import('../pages/qflow-search'))
const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: '/home',
        element: <LazyImportComponent lazyChildren={Home} />,
      },
      {
        path: '/help-docs',
        element: <LazyImportComponent lazyChildren={HelpDocs} />,
      },
      {
        path: '/best-practices',
        element: <LazyImportComponent lazyChildren={BestPractices} />,
      },
      {
        path: '/recent-update',
        element: <LazyImportComponent lazyChildren={RecentUpdate} />,
      },
      {
        path: '/qflow-college',
        element: <LazyImportComponent lazyChildren={QflowCollege} />,
      },
      {
        path: '/qflow-search',
        element: <LazyImportComponent lazyChildren={QflowSearch} />,
      },
    ],
  },
]

export default routes
