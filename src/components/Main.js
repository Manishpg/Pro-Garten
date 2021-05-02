import React, {useState,useEffect} from 'react'
import '../bootstrap.min.css';
import axios from 'axios';
import './Main.css';
import Logo from './external-link.png';



function Main() {

    const [posts,setPost] = useState([]);
    const [username,setUsername] = useState("");
   

    //Function for  getting Date 1 week ago
    function formatDate() {
      var d = new Date(Date.now() - 604800000),
          month = '' + (d.getMonth() + 1),
          day = '' + (d.getDate()),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }



const getRequest =() =>{
  axios.get(`https://api.github.com/search/repositories?q=created:>${formatDate()}`)
  .then(res=>{
     
  setPost(res.data.items)
  })
  .catch(err => console.log(err))

}

useEffect(()=>{
axios.get(`https://api.github.com/search/repositories?q=created:>${formatDate()}`)
.then(res=>{
setPost(res.data.items)

})
.catch(err => console.log(err))
},[posts])



const handleSubmit= (e) => {
    e.preventDefault();
 
    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(res => {
        setPost(res.data)
    })
    .catch(err=>console.log(err));
}



    return (
        <div>
            <nav className="navbar fixed-top  navbar-change" >
  <div className="container-fluid">
    <p className="navbar-brand" onClick={getRequest}>Popular Repositories of the week in Github</p>
    

    <form className="d-flex" onSubmit={handleSubmit}>
        <input type="text" className="form-control mx-2" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Search by Username" />
        <button className="btn btn-success" type="submit">Search</button>
      </form>
  </div>
</nav>

<div className="container my-3">

{  posts.map(post=>{
    return (
        
        <div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img  width="200px" src={post.owner.avatar_url} alt={post.full_name} />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{post.full_name} <span><a rel="noreferrer" href={post.html_url} target="_blank"><img src={Logo} alt="icon-logo"/></a></span>  </h5>
        <p className="card-text">{post.description}</p>
        {post.language &&  <p className="card-text"><small className="text-muted">{post.language}</small></p>}
         <p className="card-text">★: {post.stargazers_count}</p>
      </div>
    </div>
  </div>
</div> 

    )
    
})} 


</div>
        </div>
    )
}

export default Main
