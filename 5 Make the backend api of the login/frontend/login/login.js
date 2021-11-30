function submitForm(event) {
    event.preventDefault();
    const form=new FormData(event.target)
    const loginDetails={
        email:form.get('email'),
        password:form.get('password')
    }
    axios.post(`http://localhost:3000/login`,loginDetails).then((response) => {
        console.log(response);
    }).catch((error) => {console.log(error);})
}