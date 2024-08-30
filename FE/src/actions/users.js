import axios from 'axios';

export const AC_ADD_USER = (userdata) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', userdata.image);
    formData.append('uname', userdata.uname);
    formData.append('uaddress', userdata.uaddress);
    formData.append('uemail', userdata.uemail);
    formData.append('uphno', userdata.uphno);

    axios.post('http://localhost:3001/users/user_post_method', formData)
      .then((response) => {
        dispatch({ type: "ADD_USER", payload: response.data });
        console.log("------", response.data);
      })
      .catch((error) => {
        // Handle error
        console.log('--------', error);
      });
  };
};
