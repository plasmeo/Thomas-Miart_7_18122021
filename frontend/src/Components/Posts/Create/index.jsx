import './create.css'
import arrow from '../../../Assets/img/arrow.png'

function handleSubmit(e) {
    e.preventDefault()
    let form = e.target;
    let formData = new FormData(form);

    /*let obj = {};    
    for(let key of formData.keys()){
        obj[key] = formData.get(key);
     //   console.log(key, formData.get(key));
    }*/
    sendData(formData);  
}

function sendData(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
                    'Authorization': localStorage.getItem("token")},
        body:data
        // JSON.stringify(data)
    };
    fetch('http://localhost:4200/api/posts/', requestOptions)
        .then(response => response.json())
        //.then(data => console.log(data));
        //.then(data => this.setState({ postId: data.id }));
        
}

function CreatePost() {
    return (
        <div className="CreatePost">
            <h2>Nouveau post</h2>
            <form className="createForm" onSubmit={handleSubmit}>
                <label for="postTile">Titre</label>
                <input type='text' name='postTitle' required="required" />
                <label for="postContent">Contenu</label>
                <input type='textarea' name='postContent' required="required" maxLength="220"/>
                <label for="file">Média</label>
                <input type='file' name="file" accept=".jpg,.jpeg,.png"/>
                <button type='submit'><img src={arrow} alt="publier" className="postIcon" /></button>
            </form>
        </div>
    )
}


export default CreatePost

