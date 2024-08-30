const initialState = {
    Isauthlogin_Admin:false
  };
  
  const setloginAdminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGINADMIN_DATA':
        return {
          ...state,
          Isauthlogin_Admin:true
        };
      default:
        return state;
    }
  };

  export default setloginAdminReducer;