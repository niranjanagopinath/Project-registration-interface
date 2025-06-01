import React, { HtmlHTMLAttributes, ReactHTMLElement, useState } from "react";
import './forms.css';

function Forms() {
  const [projecttitle, setprojecttitle] = useState("");
  const [depttitle, setdepttitle] = useState("");
  const [newdeptitle, setnewdeptitle] = useState("");
  const [projectlead, setprojectlead] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [projectcategory, setprojectcategory] = useState("");
  const [newprojcategory, setnewprojcategory] = useState("");
  const [briefdescription, setbriefdescription] = useState("");
  const [budget, setbudget] = useState("");
  const [client, setclient] = useState("");
  const [email,setemail] =  useState("");

  const [file, setFile] = useState<File | null>(null);

  const changetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprojecttitle(e.target.value);
  };

  const changebudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbudget(e.target.value);
  };

  const changedepttitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setdepttitle(e.target.value);
  };

  const changeprojectlead = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprojectlead(e.target.value);
  };

  const changestartdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setstartdate(e.target.value);
  };
  const changeenddate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenddate(e.target.value);
  };
  const changeprojcat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setprojectcategory(e.target.value);
  };
  const changenewdept = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewdeptitle(e.target.value);
  };
  const changenewprojcat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewprojcategory(e.target.value);
  };
  const changebd = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setbriefdescription(e.target.value);
  };
  const changeclient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setclient(e.target.value);
  };
  const changeemail=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setemail(e.target.value);
  }

  const handlefilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const finaldept = depttitle === "Other" ? newdeptitle : depttitle;
  const finalprojectcat =
    projectcategory === "Other" ? newprojcategory : projectcategory;

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("title",projecttitle);
    formdata.append("department",finaldept);
    formdata.append("project_lead",projectlead);
    formdata.append("budget",budget);
    formdata.append("client",client);
    formdata.append("startdate",startdate);
    formdata.append("enddate", enddate);
    formdata.append("project_category",finalprojectcat);
    formdata.append("brief_description",briefdescription);
    formdata.append("email",email);

    if(file){
      formdata.append("filename",file);
    }

    try{
      const response=await fetch("http://127.0.0.1:8000/register",{
        method:"POST",
        body:formdata,

      });
      if (response.ok){
        const data = await response.json();
        console.log("success",data);
      }
      else{
        console.error("server error",await response.text());
      }



    }
    catch(err){
      console.error("request failed",err)
    }
  };






  

  return (
    <>
      
      <div className="body">
      <div className="form-wrapper-box">
      <div className="fw-bold">
      <h1>
        <center>Project Registration Interface </center>
      </h1>
      </div>

      
      <div className="container">
        <form onSubmit={handlesubmit} method="POST" encType="multipart/form-data">
          <div className="d-flex flex-wrap justify-content-between mb-3">
            <div className="me-3 flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="projtitle" className="fw-bold"> Project Title</label>
              <input
                type="text"
                id="projtitle"
                name="projtitle"
                className="form-control"
                value={projecttitle}
                onChange={changetitle}
                placeholder="Enter the project title"
                required
              ></input>
            </div>
            <div className="flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="department" className="fw-bold">Enter the department</label>
              <select
                id="department"
                name="department"
                className="form-control"
                value={depttitle}
                onChange={changedepttitle}
                required
              >
                <option value="">-- Select Department --</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="MECH">Mechanical (MECH)</option>
                <option value="EEE">Electrical (EEE)</option>
                <option value="CIVIL">Civil</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {depttitle === "Other" && (
            <div className="mb-3">
              <label htmlFor="newdepttitle" className="fw-bold"> Other Department</label>
              <input
                type="text"
                name="newdepttitle"
                id="newdepttitle"
                className="form-control"
                value={newdeptitle}
                placeholder="Enter the other department"
                onChange={changenewdept}
              ></input>
            </div>
          )}
          <div className="d-flex flex-wrap justify-content-between mb-3">
            <div className="me-3 flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="budget" className="fw-bold">Estimated Budget</label>
              <input
                type="text"
                className="form-control"
                name="budget"
                id="budget"
                onChange={changebudget}
                placeholder="Enter the estimated budget "
                value={budget}
              ></input>
            </div>
            <div className="flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="client" className="fw-bold">Client</label>
              <input
                type="text"
                className="form-control"
                name="client"
                id="client"
                placeholder="Enter the name of the client"
                onChange={changeclient}
                value={client}
              ></input>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between mb-3">
            <div className="me-3 flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="projectlead" className="fw-bold">Project Lead</label>
              <input
                type="text"
                name="projectlead"
                id="projectlead"
                className="form-control"
                value={projectlead}
                onChange={changeprojectlead}
                required
                placeholder=" Enter the name of the project lead"
              ></input>
            </div>
            <div className="flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="projectcategory" className="fw-bold">
                Select the category of your project
              </label>
              <select
                name="projectcategory"
                id="projectcategory"
                className="form-control"
                value={projectcategory}
                onChange={changeprojcat}
              >
                <option value="">-- Select Project Type --</option>
                <option value="opt1">option 1 </option>
                <option value="opt2">option 2</option>
                <option value="opt3">option 3</option>
                <option value="opt4">option 4</option>
                <option value="opt5">option 5</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {projectcategory == "Other" && (
            <div className="mb-3" >
              <label htmlFor="newprojcategory" className="fw-bold">Other Category</label>
              <input
                type="text"
                name="newprojcategory"
                id="newprojcategory"
                value={newprojcategory}
                onChange={changenewprojcat}
                className="form-control"
                placeholder="Enter the other category"
              ></input>
            </div>
          )}

          <div className="d-flex flex-wrap justify-content-between mb-3">
            <div className="me-3 flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="startdate" className="fw-bold">Start Date</label>
              <input
                type="date"
                name="startdate"
                id="startname"
                className="form-control"
                value={startdate}
                placeholder="Enter the start date"
                onChange={changestartdate}
              ></input>
            </div>

            <div className="flex-grow-1" style={{ maxWidth: "48%" }}>
              <label htmlFor="enddate" className="fw-bold">End Date </label>
              <input
                type="date"
                name="enddate"
                id="enddate"
                className="form-control"
                value={enddate}
                placeholder="enter the estimated end date "
                onChange={changeenddate}
              ></input>
            </div>
          </div>
          <br/>
          <div className="mb-3">
            <label htmlFor="email" className="fw-bold">Email</label>
            <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="enter your email id"
            value={email}
            onChange={changeemail}>
            </input>
          </div>
          <br></br>

          <div className="mb-3">
            <label htmlFor="briefdescription" className="fw-bold">Brief description</label>
            <textarea
              rows={4}
              className="form-control"
              value={briefdescription}
              onChange={changebd}
              placeholder="Give a brief description of the project"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="fw-bold" >Documents</label>
            <input
              type="file"
              name="filename"
              id="filename"
              onChange={handlefilechange}
              className="form-control"
            ></input>

            <small className="form-text text-muted">
              If there are multiple documents, please upload them as a ZIP file.
            </small>
          </div>

          {file && (
            <div className="mb-3">
              <small className="text-muted">Selected file: {file.name}</small>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
             
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  );
}
export default Forms;
