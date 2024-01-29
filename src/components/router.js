import { Navigate } from 'react-router-dom';
import App from '../App';
import { isAuthenticated } from '../hooks/isAuthenticated';
import Login from './Login';
import NotFound from './NotFound';

// if already authenticated and try to access login page, redirect to homepage
const PublicRoute = ({ children }) => {
    return isAuthenticated ? <Navigate to="/" /> : children;
};

// if not authenticated and try to access protected page, redirect to login
const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const wrapRoutesWithProtectedRoute = (routes) => {
    // Map over the routes array
    return routes.map(route => {
        // Check if the route has children
        if (route.children) {
            // If it has children, recursively wrap the children with protected route
            const children = wrapRoutesWithProtectedRoute(route.children);
            return {
                ...route,
                children,
            };
        } else {
            // If the route does not have children, determine whether to wrap it with protected or public route
            return {
                ...route,
                element: shouldWrapWithProtectedRoute(route) ? (
                    // If it should be wrapped with protected route, create a ProtectedRoute element
                    <ProtectedRoute key={route.path}>{route.element}</ProtectedRoute>
                ) : (
                    // If it should be wrapped with public route, create a PublicRoute element
                    <PublicRoute key={route.path}>{route.element}</PublicRoute>
                ),
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
        private: true,
        element: <App />,
        children: [
            {
                index: true, // main homepage route
                private: true,
                element: <div>Main layout</div>,
            },
            {
                path: "dashboard",
                private: false,
                children: [
                    {
                        index: true, // dashboard homepage route
                        private: true,
                        element: <div>this is dashboard page</div>,
                    },
                    {
                        path: ":id",
                        private: true,
                        element: <div>i am from dashboard inner</div>,
                    },
                ]
            },
        ],
    },
    {
        path: '*',    // 404 not found page
        element: <NotFound />,
    },
]);
