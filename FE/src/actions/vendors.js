import axios from 'axios';
export const AC_ADD_VENDOR=(vendordata)=>{
    console.log('-------',vendordata);
    return (dispatch) => {
        axios.post('http://localhost:3001/vendors/vendor_post_method',vendordata)
          .then((response) => {            
            dispatch({type:"ADD_VENDOR",payload:response});
            console.log("------",response);
          })
          .catch((error) => {
            // dispatch(error.message);// it will show error message on screen when API not hit by post
             console.log('--------',error);
          });
        }
}