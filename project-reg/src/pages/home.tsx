import './home.css'
import myImage from 'C:/Users/niran/Downloads/image-removebg-preview.png';

function Home(){
    return(
    <>
    <div className="textbox">
    <div className="home">
    <h1>Welcome to the project registration portal</h1>
    

    </div>
    <div className="below">
        <p>This platform streamlines the registration and tracking of new projects 
            across Engineering, Procurement, and Construction (EPC) functions. 
            Designed for efficiency and transparency, it enables real-time collaboration, 
            status monitoring, and standardized data entry to support project execution in 
            the oil and gas sector.</p>
    </div>
    </div>
    <div className="image-container">
          <img src={myImage} alt="Project illustration" />
        </div>

    
    </>
);
}
export default Home;