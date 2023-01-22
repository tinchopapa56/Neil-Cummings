import React from 'react'
import { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router-dom'
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';

export const routes: RouteObject[] = [
    {
        path:"/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "activities", element: <ActivityDashboard />},
            {path: "activities/:id", element: <ActivityDetails />},
            {path: "createActivity", element: <ActivityForm />},
            {path: "manage/:id", element: <ActivityForm />},
            {path: "login", element: <Login />},
            {path: "register", element: <Register />},

            {path: "errors", element: <Register />},
            {path: "not-found", element: <Register />},
            {path: "server-error", element: <Register />},
        ]
    }
]
export const router = createBrowserRouter(routes);
