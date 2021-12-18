import PropTypes from 'prop-types'
import './comment.css';
import deleteIcon from '../../Assets/img/delete_icon.png';

function Comment({content ,userName, postId, commentId, UserId}) {
  
   // let connectedUserId = parseFloat(localStorage.getItem("userID"));
    
    
    function sendeleteRequest() {        
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")},

        };
        fetch('http://localhost:4200/api/posts/' + postId +'/comments/' + commentId, requestOptions)
            .then(response => {
                response.json();
                document.location.reload();
            })
            //.then(data => console.log(data));
            //.then(data => this.setState({ postId: data.id }));
            
    }

if (postId === commentId && userName){
    return (
        <div className={'comment comment-'+postId+'-'+commentId}>  
            <p className="commentUserName">{userName}</p>          
            <p className="commentContent">{content}</p>
            {(UserId == localStorage.getItem("userID")|| localStorage.getItem("isAdmin")=="true") && 
            <img className="deleteIcon" src={deleteIcon} onClick={sendeleteRequest} />}
        </div>
    )

}
else{
    return null
}

  
}

Comment.propTypes = {
    //userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
 
export default Comment