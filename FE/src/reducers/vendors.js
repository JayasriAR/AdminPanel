const initialState ={
    isAuth:false,
    statusvendor:false
}
const VendorReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_VENDOR":
            return{...state,statusvendor:true}
      default:
          return state;
  }
};
export default VendorReducer;