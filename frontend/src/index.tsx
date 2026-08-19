import { Router, type RouteDefinition } from '@solidjs/router'
import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import './index.css'

const routes: RouteDefinition[] = [
  {
    path: '/login',
    component: lazy(() => import('./pages/Login'))
  },
  {
    path: '/*',
    component: lazy(() => import('./pages/NotFound'))
  },
  {
    component: ProtectedRoute,
    children: [
      {
        path: '/',
        component: lazy(() => import('./pages/Dashboard'))
      }
    ]
  }
]

render(() => <Router>{routes}</Router>, document.getElementById('root')!)
