function submitForm(e) {
    e.preventDefault();
    const form=new FormData(e.target)
    const signUpDetails={
        name:form.get('name'),
        email:form.get('email'),
        phone:form.get('phone'),
        password:form.get('password')
    }
   
    axios.post(`http://localhost:3000/signup`,signUpDetails).then(res => {
        
        alert(res.data.message);
    }).catch(err => {
        console.log(err);
        console.log(err.message);
        // alert(`User already exists, Please Login`)
    })
}