import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Comment from '../../Comments/comment';
import './post.css';
import deleteIcon from '../../../Assets/img/delete_icon.png';
import arrow from '../../../Assets/img/arrow.png';

function Post({UserId, id ,picURL, title, content, likes, dislikes}) {

    const [comments, setComments] = useState(null);

    useEffect(() =>{
        if (comments === null){
            loadComments();
        }

    }, [])    

    const loadComments = useCallback( ()=>
        {
           
        const requestOptions = {
            method: 'GET',
            /*headers: { 'Content-Type': 'application/json'}*/
        };
        fetch('http://localhost:4200/api/posts/'+id+'/comments/', requestOptions)
            .then(response => response.json())
            .then(data => {
               // console.log(data);
               setComments(data);
            }); 
        })


    function sendLike(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")},
            //body:data
            body: JSON.stringify(data),
        };
        fetch('http://localhost:4200/api/posts/'+ id + '/like', requestOptions)
            .then(response => response.json())
            .then(data =>{
                //console.log(data);
                if (data.like != null || data.dislikes != null){
                    let likeCount = document.getElementById(likeClass);
                    likeCount.innerHTML = data.likes;
                    let dislikeCount = document.getElementById(disLikeClass);
                    dislikeCount.innerHTML = data.dislikes;
                }

            } )
            
    }

    function likePost(e) {
        e.preventDefault();

        let data = {
            like: 1,
            postId: id
        }
        sendLike(data);        
    }

    function dislikePost(e) {
        e.preventDefault();

        let data = {
            like: -1,
            postId: id
        }
        sendLike(data);        
    }

    function postComment(e) {
        e.preventDefault()
        let commentContent = document.getElementById('commentContent'+id).value;
        let formData = {   
            commentContent: commentContent,
            postId: id     
        }

        sendComment(formData);  
    }

    function sendComment(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")},
            //body:data
            body: JSON.stringify(data),
        };
        fetch('http://localhost:4200/api/posts/' + id + "/comments/", requestOptions)
            .then(response => {
                loadComments();
                return response.json();
            })
            //.then(data => console.log(data));
            //.then(data => this.setState({ postId: data.id }));
            
    }

    function sendeleteRequest() {        
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")},

        };
        fetch('http://localhost:4200/api/posts/' + id, requestOptions)
            .then(response => {
                response.json();
                loadComments();
                document.location.reload();
            })
            //.then(data => console.log(data));
            //.then(data => this.setState({ postId: data.id }));
            
    }

let className = 'post ';
className += id;
let likeClass = 'likesCount ';
likeClass += id;

let disLikeClass = 'disLikesCount ';
disLikeClass += id;



//                <button onClick={sendeleteRequest}>Delete Post</button>
        return (
            <div className={className}>
                {
                (UserId == localStorage.getItem("userID")|| localStorage.getItem("isAdmin") === "true" ) && 
                <img src={deleteIcon} alt="delete icon" onClick={sendeleteRequest} className="deleteIcon" />
                }
                
                <p className="postTitle">{title}</p>  
                <div className="postContent">
                {picURL != null && <img src={picURL} alt="PostPic" />}    
                <span>{content}</span>
                </div>  
                <div className="votes">
                    <div className="like">
                        <img src={arrow} onClick={likePost} alt="like"/>
                        <span id={likeClass}>{likes}</span>
                    </div>
                    <div className="dislike">
                        <img src={arrow} onClick={dislikePost} alt="dislike"/>
                        <span id={disLikeClass}>{dislikes}</span>
                    </div>
                </div>  
               
                <div className="getComments">
                    <p className="commentaires">Commentaires</p>
                    {(comments||[]).map((comment, index) =>(

          <Comment 
          content={comment.Content} userName={comment.userName} postId={comment.PostId} commentId={id} UserId={comment.UserId} key={comment.id} />          
       ))}
                </div>
                <div className="postComment">
                <form onSubmit={postComment}>
                <input type='textarea' id={'commentContent'+id} required="required" />
                <button type='submit'><img src={arrow} alt="publier" className="sendIcon" /></button>
                </form>

                </div>
            </div>
        )
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    picture: PropTypes.string,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
}
 
export default Post