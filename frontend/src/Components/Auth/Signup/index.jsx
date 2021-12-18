import validator from 'validator';
import './signup.css'
import arrow from '../../../Assets/img/arrow.png'

function handleSubmit(e) {
    e.preventDefault()
    const email = e.target['email'].value;
    const password = e.target['password'].value;
    const firstName = e.target['firstName'].value;
    const lastName = e.target['lastName'].value;
    if (validator.isEmail(email)) {
       // console.log(email + "  " + password);
        sendData({
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        });
    }else{
        alert("invalid email adress")
    }   
}

function sendData(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:4200/api/auth/signup', requestOptions)
        .then(response => {response.json();
        console.log(response);})
        
        //.then(data => console.log(data));
        //.then(data => this.setState({ postId: data.id }));
        
}

function Signup() {
    return (
        <div className="signup">
            <h2>Signup</h2>
            <form className="signupForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Adresse mail</label>
                <input type='email' name='email' />
                <label htmlFor="password">Mot de passe</label>
                <input type='text' name='password' />
                <label htmlFor="firstName">Prénom</label>
                <input type='text' name='firstName' />
                <label htmlFor="lastName">Nom</label>
                <input type='text' name='lastName' />
                <button type='submit'><img src={arrow} alt="login" className="logIcon" /></button>
            </form>
        </div>
    )
}


export default Signup