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
      const managerEmail="neenu098@gmail.com";
      const url1=`http://localhost:8000/send-magic-link`;
      if(email.trim().toLowerCase()===managerEmail.toLowerCase()){
        const response=await fetch(url1,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({email}),

        });
        const result=await response.json(); 

        if (response.ok){
          alert("magic link has been sent check you mail please");
        }
        else{
          alert("failed to send magic link");
        }
        return;
      }
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
      <center><h3>Enter your email to view your projects</h3></center>
      
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
        <div className="momo">
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
