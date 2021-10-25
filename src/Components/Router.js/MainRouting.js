
import React from 'react'
import {Route,Switch,Link,BrowserRouter as Router}  from 'react-router-dom'
import SignIn from '../Users/SignIn'
import SignUp from '../Users/SignUp'
import AdminSignIn from '../Admin/AdminSignIn'
import AdminSignUp from '../Admin/AdminSignUp'
import AdminRouting from '../Admin/AdminRouting'
import UserRouting from '../Users/UsersRouting'
import HomePage from '../Home'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useHistory}  from 'react-router-dom'

const MainRouting = () => {
//     const history=useHistory()
// const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
            
//             // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     const uemail= user.email;
//     history.push('/users')
//     // ...
// } else {
//     // User is signed out
//     // ...
// }
// });
    return (
<Router>
<Switch>
    <Route component={HomePage} path='/'    exact={true} />
    <Route component={SignIn} path='/signIn'    />
    <Route component={SignUp} path='/signUp' />
    <Route component={AdminRouting} path='/admin'  />
    <Route component={UserRouting} path='/users' />
    <Route component={AdminSignIn} path='/adminSignIn'  />
    <Route component={AdminSignUp} path='/adminSignUp'  />
</Switch>




</Router>

    )


}

export default MainRouting
