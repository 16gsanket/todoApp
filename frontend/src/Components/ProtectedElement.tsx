import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedElement(): JSX.Element {
    // Access the auth state correctly
    const stalestate = useSelector((state:any)=>state)
    console.log('stalestate ',stalestate);
    

    const authState = useSelector((state: any) => state.auth);
    console.log('auth state from auth:', authState);
    
    const isAuthenticated = authState?.isAuthenticated || false;
  
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
  }

export default ProtectedElement