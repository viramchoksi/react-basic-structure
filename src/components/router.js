import { Navigate } from 'react-router-dom';
import DashboardInner from './DashboardInner';
import Login from './Login';
import { isAuthenticated } from '../hooks/isAuthenticated';

// if already authenticated and try to access login page, redirect to homepage
const PublicRoute = ({ children }) => {
    return isAuthenticated ? <Navigate to="/" /> : children;
};

// if not authenticated and try to access protected page, redirect to login
const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const wrapRoutesWithProtectedRoute = (routes) => {
    return routes.map(route => {
        // Check if the route has children
        if (route.children) {
            // If the route has children, map over the children array and wrap each element in ProtectedRoute
            const children = route.children.map(child => ({
                ...child,
                element: shouldWrapWithProtectedRoute(child) ? (
                    <ProtectedRoute key={child.path}>{child.element}</ProtectedRoute>
                ) : <PublicRoute key={child.path}>{child.element}</PublicRoute>,
            }));
            // Return the route object with wrapped children
            return {
                ...route,
                children,
            };
        } else {
            // If the route doesn't have children, check if it has an element and if it should be wrapped
            return {
                ...route,
                element: shouldWrapWithProtectedRoute(route) ? (
                    <ProtectedRoute key={route.path}>{route.element}</ProtectedRoute>
                ) : <PublicRoute key={route.path}>{route.element}</PublicRoute>,
            };
        }
    });
};

// Function to determine whether a route should be wrapped with ProtectedRoute
const shouldWrapWithProtectedRoute = (route) => {
    return route.private !== false;
};

// Example usage
export const routes = wrapRoutesWithProtectedRoute([
    {
        path: 'login',
        private: false,
        element: <Login />,
    },
    {
        path: '',
        children: [
            {
                index: true, // index route for specified route
                private: true,
                element: <div>this is home page</div>,
            },
            {
                path: ":id",  // dynamic route
                private: true,
                element: <DashboardInner />,
            },
        ],
    },
]);


