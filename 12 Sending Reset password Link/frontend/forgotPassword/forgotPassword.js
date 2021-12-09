async function submitForm(event){
    event.preventDefault();
    const form=new FormData(event.target)
    const emailInfo={
        email:form.get('email'),
    }
    
  const res= await axios.post(`http://localhost:3000/password/forgotpassword`,emailInfo)
  console.log(res);
}
