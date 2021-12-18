import { useEffect, useState } from 'react';
import Post from '../Post'
import './allPosts.css';

function GetAllPosts() {

    const [data, setData] = useState([]);

    useEffect(() =>{

        const requestOptions = {
            method: 'GET',
            /*headers: { 'Content-Type': 'application/json'}*/
        };
        fetch('http://localhost:4200/api/posts/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
    }, [])    

    return (
        <div>
            <h2>Tous les posts</h2>
            <div className="allPosts">

                {data.map((post, index) =>(
                    <Post {...post} key={post.id} />
                    ))}
            </div>
        </div>
        
    )  
        
}

/*

                {postsList.map((post, index) =>(
          <Post
            key={`${post.name}-${index}`}
           title={post.title}
           picture={post.picURL}
           content={post.content}
           likes={post.likes}
           dislikes={post.dislikes}
        />
       ))}
}*/


export default GetAllPosts;