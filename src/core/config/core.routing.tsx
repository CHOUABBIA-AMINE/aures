import { Route }                from "react-router-dom";
import { Routes }               from "react-router-dom";

import Home                     from "../view/home";
import About                    from "../view/about";
import Login                    from "../view/login";

import UserList                 from "../view/core/user.list";

function CoreRouting(){
	return (
        <Routes>
            <Route path='/'                 element={<Home />} />
            <Route path='/home'             element={<Home />} />
            <Route path='/about'            element={<About />} />
            <Route path='/login'            element={<Login />} />

            <Route path="/provider"         element={<About />}></Route>    
            <Route path="/finance"          element={<About />}></Route>
            <Route path="/consultation"     element={<About />}></Route>
            <Route path="/contract"         element={<About />}></Route>
            <Route path="/amendment"        element={<About />}></Route>
            <Route path="/purchase"         element={<About />}></Route>

            <Route path="/administration"   element={<About />}></Route>
            <Route path="/environment"      element={<About />}></Route>
            <Route path="/communication"    element={<About />}></Route>
            <Route path="/security"         element={<About />}></Route>
                <Route path="/user"             element={<UserList />}></Route>

        </Routes>
    )
}
export { CoreRouting };