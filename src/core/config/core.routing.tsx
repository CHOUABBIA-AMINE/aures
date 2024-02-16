import { Route }                from "react-router-dom";
import { Routes }               from "react-router-dom";

import Home                     from "../view/home";
import About                    from "../view/about";
import NotFound                 from "../view/not.found";
import Login                    from "../view/login";

import ModelList                from "../view/core/model.list";
import UserDetails              from "../view/core/details/common/security/user";

function CoreRouting(){
	return (
        <Routes>
            <Route path='/'                 element={<Home />} />
            <Route path='home'              element={<Home />} />
            <Route path='about'             element={<About />} />
            <Route path='login'             element={<Login />} />

            <Route path="provider"          element={<About />}></Route>    
            <Route path="finance"           element={<About />}></Route>
            <Route path="consultation"      element={<About />}></Route>
            <Route path="contract"          element={<About />}></Route>
            <Route path="amendment"         element={<About />}></Route>
            <Route path="purchase"          element={<About />}></Route>

            <Route path="administration"    element={<About />}></Route>
            <Route path="environment"       element={<About />}></Route>
            <Route path="communication"     element={<About />}></Route>
            <Route path="security"          element={<About />}></Route>

            <Route path="list/:entity"      element={<ModelList />}></Route>
            <Route path="user/:action"      element={<UserDetails />}></Route>
            
            <Route path="*"                 element={<NotFound />}></Route>

        </Routes>
    )
}
export { CoreRouting };