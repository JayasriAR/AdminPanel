const initialState = {
    Isauth_Admin:false
  };
  
  const setAdminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ADMIN_DATA':
        return {
          ...state,
          Isauth_Admin:true
        };
      default:
        return state;
    }
  };

  export default setAdminReducer;