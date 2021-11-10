import React from "react"
import axios from "axios";
import SkillsForm from "./components/SkillsForm";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const App = () => {
    const [activeItem, setActiveItem] = React.useState({
        title: "",
        description: "",
        skills: [{ name: ''}],
      })
      const [skills, setSkills] = React.useState([{ name: ''}]);
      const [jobDetail, setJobDetail] = React.useState({
        title: "",
        skills: [],
        description: "",
    });
      const [jobList, setjobList] = React.useState([]);
     const [skillList, setskillList] = React.useState([]);

    //   jobDetail: {
    //     title: "",
    //     skills: [],
    //     description: "",
    // },
    // jobList: [],
    // skillList: [],
    // jobDetail: []

      console.log(activeItem);

      const getData = async () => {
        try {
            const res = await fetch('http://localhost:8000/jobs/get_jobs_list');
            const jobList = await res.json()
            setjobList(
                jobList
            );
        } catch (e) {
            console.log(e)
        }

        try {
            const res = await fetch('http://localhost:8000/jobs/get_skills_list');
            const skillList = await res.json()
            this.setState({
                skillList
            });
        } catch (e) {
            console.log(e)
        }

        try {
            const res = await fetch('http://localhost:8000/jobs/get_job_details/3');
            const jobDetail = await res.json()
            this.setState({
                jobDetail
            });
        } catch (e) {
            console.log(e)
        }
    }

    const getSkillsData=async ()=>{
        try {
            const res = await fetch('http://localhost:8000/jobs/get_skills_list');
            const skillList = await res.json()
            setskillList(
                skillList
            );
        } catch (e) {
            console.log(e)
        }
    }
    const getJobDetails=async(e)=>{
        try {
            const url='http://localhost:8000/jobs/get_job_details/'+e.target.id;
            const res = await fetch(url);
            const jobDetail = await res.json()
            console.log(e.target.id)
            setJobDetail(
                jobDetail
            );
        } catch (e) {
            console.log(e)
        }
       }

const getNewJobDetails=async()=>{
        try {
            const job_id = jobList[0].id;
            const url='http://localhost:8000/jobs/get_job_details/' +job_id;
            const res = await fetch(url);
            const jobDetail = await res.json()
            setJobDetail(
                jobDetail
            );
        } catch (e) {
            console.log(e)
        }
       }

      React.useEffect(() => {
    getSkillsData();
        getData();
            getNewJobDetails();


},[])
async function onSave(e){

    try {
        const body = {
            title: activeItem.title,
            description: activeItem.description,
            job_skill: skills.map(item => ({  skill_name: item.name})) 
        }
            // const res = await fetch('http://localhost:8000/api/todos/');
            const res = axios.post("http://localhost:8000/jobs/create", body).then(item => {
                getData();
                getSkillsData();
                alert("Job created successfully.")

            }).catch(e => {
                const data = e.response.data
                if (data.title ){
                    alert("Title: " + data.title[0])
                }else if (data.description ){
                    alert("Description: " +data.description[0])
                }else if (data.job_skill ){
                    alert("Skill: " + data.job_skill[0])
                }
            })

          } catch (e) {

            console.log(e);
        }
}

      const renderItems = () => {
        const newItems = jobList;
        return newItems.map(item => (

            <button type="button"  onClick={getJobDetails} id={item.id} class="list-group-item list-group-item-action" aria-current="true">
            {item.title}
            </button>
            

        ));
    };

    const renderSkills = () => {
        const newSkills = skillList;
        return newSkills.map(item => (
            <li
                key={item.skill_name}
                className="list-group-item d-flex justify-content-between align-items-start"
            >
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{item.skill_name}</div>
                </div>
                <span class="badge bg-primary rounded-pill">{item.most_used}</span>
            </li>
        ));
    };


    const renderJobDetails = () => {
        const jobDetails = jobDetail;
        const data = [];
        const job_skills = jobDetails.job_skill || [];
        console.log(jobDetails)
			return (

			<div className="card" >
                  <div className="card-body">

                    <h5 className="card-title">{jobDetail.title}</h5>
                    <p className="card-text">{jobDetail.description}</p>
                  </div>
                  <div className="card-body">
                   {job_skills.map(item => <span class="badge bg-light text-dark">{item.skill_name}</span>)}

                  </div>
                </div>


			)
    };
      return (
        <main className="content">
           <h1 className="mt-1 text-uppercase text-center">Harness Job Manager</h1>
           <div className="container my-3">
              <div className="row">
                 <div className="col-md-9 col-sm-10">
                    <div className="card">
                       <div className="card-body">
                          <SkillsForm activeItem={activeItem} setActiveItem={setActiveItem} skills={skills} setSkills={setSkills} onSave={onSave} />
                       </div>
                    </div>
                 </div>
                 <div className="col-md-3 col-sm-10">
                    <div className="card card-height">
                       <div class="card-header">
                          Skills
                       </div>
                       <ul className="list-group list-group-numbered">
                          {renderSkills()}
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
           <div className="container my-3">
              <div className="row">
                 <div className="col-md-3 col-sm-10">
                    <div className="card card-height">
                       <div class="card-header">
                          Job List
                       </div>
                       {renderItems()}
                    </div>
                 </div>
                 <div className="col-md-9 col-sm-10">
                    <div className="card">
                       <div class="card-header">
                          Detail
                       </div>
                       <div className="card-body">
                          {renderJobDetails()}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      )
    }

export default App;
