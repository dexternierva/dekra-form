import React from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { Switch, Route } from "react-router-dom";
import { useCurrentUser } from "./containers/CurrentUser";

import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import User from "./components/User";
import SignUp from "./components/Formik/SignUp";
import Login from "./components/Formik/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetails from "./components/UserDetails";
import PracticalSkillsDetails from "./components/PracticalSkillsDetails";

function App () {
	const currentUser = useCurrentUser();

	return (
		<>
			<Switch>
				<Route 
					path='/' 
					exact component={ Login } 
				/>
				<Route path="/users/:id" component={ User } exact/>
				<Route path="/signup" component={ SignUp } exact />
				<Route path="/userdetails/:id" component={ UserDetails } />
				<Route path="/userpracticalskills/:id" component={ PracticalSkillsDetails } />
				<Route path="/forgotpassword" component={ ForgotPassword } />
				<Route path="/resetpassword" component={ ResetPassword } />
				<ProtectedRoute
					exact
					path="/dashboard"
					component={ Dashboard }
					userAuthenticated={ currentUser.isAuthenticated }
				/>
				<Route path="*">
					<div>404 Not Found</div>
				</Route>
			</Switch>
		</>
	);
}

export default App;