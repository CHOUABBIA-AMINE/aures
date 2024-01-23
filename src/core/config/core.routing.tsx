import { Route }                from "react-router-dom";
import { Routes }               from "react-router-dom";

import Home                     from "../view/home";
import About                    from "../view/about";

function CoreRouting(){
	return (
        <Routes>
            <Route path='/'             element={<Home />} />
            <Route path='/about'        element={<About />} />
        </Routes>
    )
}
export default CoreRouting;



// import { Route }            from 'react-router-dom';
// import { Routes }           from 'react-router-dom';

// import Home                 from './home';
// import About                from './about';

// function RootRoutes() {
// 	return (
// 		<Routes>
//             <Route path="/"                 element={<Home />}></Route>
//             <Route path="/about"            element={<About />}></Route>

//             <Route path="/provider"         element={<About />}></Route>    
//             <Route path="/finance"          element={<About />}></Route>
//             <Route path="/consultation"     element={<About />}></Route>
//             <Route path="/contract"         element={<About />}></Route>
//             <Route path="/amendment"        element={<About />}></Route>
//             <Route path="/purchase"         element={<About />}></Route>

//             <Route path="/administration"   element={<About />}></Route>
//             <Route path="/environment"      element={<About />}></Route>
//             <Route path="/communication"    element={<About />}></Route>
//             <Route path="/security"         element={<About />}></Route>
//         </Routes>
// 	);
// }
// export default RootRoutes;