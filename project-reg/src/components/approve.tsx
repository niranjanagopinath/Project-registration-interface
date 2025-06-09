import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSearchParams } from "react-router-dom";
import './approve.css'


function Approve() {
  const [projects, setprojects] = useState([]);
  const [searchQuery] = useSearchParams();

  useEffect(() => {
    async function verifyAndFetch() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        const token = searchQuery.get("token");
        if (token) {
          await supabase.auth.verifyOtp({
            type: "magiclink",
            token_hash: token,
          });
        }
      }
      const user = (await supabase.auth.getUser()).data.user;
      const response = await fetch(`http://localhost:8000/view-all`);
      const data = await response.json();
      setprojects(data);
    }
    verifyAndFetch(); 
}, []);

  async function handleapprove(project_id){
    const response= await fetch(`http://localhost:8000/approve?project_id=${project_id}`,{
        method:'POST',
    });

    if(response.ok){
        setprojects((prev)=>
            prev.map((p)=>
                p.id===project_id?{...p,approval_status:'Approved'}:p));


    }
    else{
        alert("failed to approve the project");
    }
}







  return (
    <>
      <div className="heading">
        <h1>Projects To Be Approved</h1>
      </div>
      <div className="cards">
        {projects
          .filter((p) => p.approval_status === "pending") 
          .map((p) => (
            <div className="card">
              <h1>{p.title}</h1>
              <small>department</small>
              <p>{p.department}</p>
              <small>budget</small>
              <p>{p.budget}</p>
              <small>client</small>
              <p>{p.client}</p>
              <small>project lead</small>
              <p>{p.project_lead}</p>
              <small>Project_category</small>
              <p>{p.project_category}</p>
              <small>Start Date</small>
              <p>{p.start_date}</p>
              <small>End Date</small>
              <p>{p.end_date}</p>
              <small>brief description</small>
              <p>{p.brief_description}</p>
              <small>submitted by</small>
              <p>{p.submitted_by}</p>
              <button onClick={()=>handleapprove(p.id)}>Approve</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Approve;