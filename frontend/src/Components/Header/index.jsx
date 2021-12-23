import { NavLink } from 'react-router-dom';
import './header.css';
import logo from '../../Assets/img/logo.svg';

function Header() {


    function deconnexion(e) {
        e.preventDefault();  
        localStorage.clear();  
        window.location.reload();
    }
    return (
        <header>
                {localStorage.getItem("userEmail")==null && 
            <p>Vous n'êtes pas connecté</p>}
                {localStorage.getItem("userEmail")!=null && 
            <p>Connecté en tant que : {localStorage.getItem("userEmail")}</p>}
            <img src={logo} alt=""/>
            <nav>
                <NavLink className="headerlinks" to="/" activeClassName="nav-active">Accueil</NavLink>
                <NavLink className="headerlinks" to="/auth/signup" activeClassName="nav-active">Inscription</NavLink>
                <NavLink className="headerlinks" to="/auth/login" activeClassName="nav-active">Connexion</NavLink>
                <NavLink className="headerlinks" to="/post" activeClassName="nav-active">Nouveau post</NavLink>
                <NavLink className="headerlinks" to="/options" activeClassName="nav-active">Options de compte</NavLink>
                <button onClick={deconnexion}>Se deconnecter</button>
            </nav>
        </header>
       
    )
}


export default Header