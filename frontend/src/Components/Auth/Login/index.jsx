import validator from 'validator';
import './login.css';
import arrow from '../../../Assets/img/arrow.png'

function handleSubmit(e) {
    e.preventDefault()
    const email = e.target['email'].value;
    const password = e.target['password'].value;
    if (validator.isEmail(email)) {
        //console.log(email + "  " + password);
        sendData({
            email : email,
            password : password
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
    fetch('http://localhost:4200/api/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            localStorage.setItem('token', data.token)
            localStorage.setItem('userID', data.userId)
            localStorage.setItem('isAdmin', data.isAdmin)
    });
        
}

function Login() {
    return (
        <div className="Login">
            <h2>Login</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Adresse mail</label>
                <input type='email' name='email' />
                <label htmlFor="password">Mot de passe</label>
                <input type='password' name='password' />
                <button type='submit'><img src={arrow} alt="login" className="logIcon" /></button>
            </form>
        </div>
    )
}


export default Login