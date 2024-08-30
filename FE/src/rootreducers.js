import { combineReducers } from "redux";
import ProductReducer from "./reducers/products";
import UserReducer from "./reducers/users";
import VendorReducer from "./reducers/vendors";
import setAdminReducer from "./reducers/setadmin";
import setloginAdminReducer from "./reducers/setloginadmin";
const rootReducers = combineReducers({
    Product_Reducer:ProductReducer,
    User_Reducer: UserReducer,
    Vendor_Reducer:VendorReducer,
    setAdmin_Reducer:setAdminReducer,
    setlogin_AdminReducer:setloginAdminReducer
});
export default rootReducers;