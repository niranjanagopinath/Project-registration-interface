import React, {
  FormEvent,
  HtmlHTMLAttributes,
  ReactHTMLElement,
  useState,
} from "react";

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
    <div className="coop">
      <form className="forms" onSubmit={handlesubmit}>
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
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <div className="display">
      {viewproj.map((project)=>(
        <div key={project.id}>
            <h1>{project.title}</h1>
            <h1>{project.approval_status}</h1>
            <h1>{project.submitted_by}</h1>
        </div>

        
      ))}
      </div>
    </div>
  );
}


export default Viewproj;
