import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import UserProvider from "./conntexts/UserContext";
import LogIn from "./pages/LogIn";
import ProtectedRoute from "./utils/ProtectedRoute";
import {CustomThemeOptions} from "./styles/CustomTheme";
import Bar from "./layouts/Bar";
import {ThemeProvider} from "@mui/material";
import DashboardLayout from "./layouts/dashboard/Layout";
import {LoanCreation} from "./pages/LoanCreation";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  return (

      <Router>
        <UserProvider>
          <ThemeProvider theme={CustomThemeOptions}>
            <div className="App">
              <Bar/>
              <div className="content">
                <Routes>
                  <Route path="/login" element={
                    <LogIn/>
                  }/>
                  <Route element={<ProtectedRoute role='admin'/>}>
                    <Route element={<DashboardLayout/>}>
                      <Route path="/loan-opening" element={<LoanCreation/>}/>
                      <Route path="/loan-management" element={<NotFound/>}/>
                      <Route path="/support" element={<NotFound/>}/>
                      <Route path="/home" element={<NotFound/>}/>
                    </Route>
                  </Route>
                  <Route path="/unauthorized" element={<NotAuthorized/>}/>
                  {/* Wildcard route to redirect to login if route doesn't exist */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </div>
            </div>
          </ThemeProvider>
        </UserProvider>
      </Router>

  );
}

export default App;
