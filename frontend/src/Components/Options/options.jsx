import validator from 'validator';
import "./options.css";
import arrow from '../../Assets/img/arrow.png'

function Options() {


    function sendData(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4200/api/auth/deleteAccount', requestOptions)
            .then(response => response.json());
            //localStorage.setItem('userID', data.userId)
            
    }


    function deleteAccount(e){
        e.preventDefault()
        const email = e.target['email'].value;
        const password = e.target['password'].value;
        if (validator.isEmail(email)) {
            console.log(email + "  " + password);
            sendData({
                email : email,
                password : password
            });
        }else{
            alert("invalid email adress")
        }   
    }

      return (
        <div className="options">
            <h2>Supprimer votre compte</h2>
            <p>Veuillez renseigner votre adresse mail et mot de passe</p>
            <form className="deleteForm" onSubmit={deleteAccount}>
                <label for="email">Adresse mail</label>
                <input type='email' name='email' />
                <label for="password">Mot de passe</label>
                <input type='text' name='password' />
                <button type='submit'><img src={arrow} alt="delete" className="deleteIcon" /></button>
            </form>
        </div>
    )
        
}

export default Options;