import axios from 'axios';
export const AC_ADD_PRODUCT=(proddata)=>{
    return (dispatch) => {
      console.log('proddata',proddata);

      const formData = new FormData();
      formData.append('proimage', proddata.proimage);
      formData.append('pname', proddata.pname);
      formData.append('description', proddata.description);
      formData.append('pprice', proddata.pprice);
      formData.append('stockcount', proddata.stockcount);
      console.log('formdata',formData);
      
        axios.post('https://adminpanel-m7rn.onrender.com/products/Product_post_method',formData)
          .then((response) => {            
            dispatch({type:"ADD_PRODUCT",payload:response});
            console.log("------",response);
          })
          .catch((error) => {
            // dispatch(error.message);// it will show error message on screen when API not hit by post
             console.log('--------',error);
          });
        }
}