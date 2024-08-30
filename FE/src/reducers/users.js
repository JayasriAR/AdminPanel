const initialState ={
    isAuthuser:false,
    statususer:false
}
const UserReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_USER":
            return{...state,statususer:true}
      default:
          return state;
  }
};
export default UserReducer;