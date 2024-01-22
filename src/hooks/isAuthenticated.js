const checkIsAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
};
export const isAuthenticated = checkIsAuthenticated();