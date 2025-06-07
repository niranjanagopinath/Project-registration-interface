import React, {
  FormEvent,
  HtmlHTMLAttributes,
  ReactHTMLElement,
  useState,
} from "react";
import "./viewproj.css"

function Viewproj() {
  const [email, setemail] = useState("");
  const [viewproj, setviewproj] = useState([]);

  const changeemail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlesubmit = async(e: FormEvent) => {
    e.preventDefault();
    try{
    const url=`http://localhost:8000/myproj?email=${email}`;
    const res=await fetch(url);
    const data=await res.json();
    setviewproj(data);

    }
    catch{
        console.error("fetch failed");
    }
   




  };

  return (
    <>
    <br></br>
    <div className="coop">
      
      <form className="forms" onSubmit={handlesubmit}>
        <center>
        
        <div className="email">
          <label htmlFor="viewemail">
            <input
              type="email"
              name="email"
              id="email"
              onChange={changeemail}
              value={email}
              className="form-control"
            ></input>
          </label>
          
        </div>
        </center>
        <br/>
        <center>
        <div>
          <button type="submit">submit</button>
        </div>
        </center>
      </form>
      <br/>

      <div className="display">
       
      <div className="container">
      {viewproj.map((project)=>(
        <div className="card">
        <h1>{project.title}</h1>
        <small>Project ID</small>
        <p>{project.id}</p>
        <small>status</small>
        <p>{project.approval_status}</p>
        <small>submitted by</small>
        <p>{project.submitted_by}</p>
</div>

       
           
      
        

      ))}
      </div>
      </div>
      
      
    </div>
    </>
  );
}


export default Viewproj;
