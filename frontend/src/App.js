import React, { Component } from "react"
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {
                title: "",
                description: "",
            },
            Skill: {
                skill_name: "",
                most_used: "",
            },
            jobDetail: {
                title: "",
                skills: [],
                description: "",
            },
            jobList: [],
            skillList: [],
            jobDetail: []
        };
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8000/jobs/get_jobs_list');
            const jobList = await res.json()
            this.setState({
                jobList
            });
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

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    // Responsible for saving the task
    handleSubmit = item => {
        this.toggle();
        axios.post("http://localhost:8000/jobs/create_job", item)
    };

    createItem = () => {
        const item = {title: "", description: "", job_skill: [] }
    }


    renderItems = () => {
        const newItems = this.state.jobList;
        return newItems.map(item => (

            <button type="button" class="list-group-item list-group-item-action" aria-current="true">
            {item.title}
            </button>

        ));
    };

    renderSkills = () => {
        const newSkills = this.state.skillList;
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

    renderJobDetails = () => {
        const jobDetails = this.state.jobDetail;

    };

    render() {
        return (
            <main className="content">
                <div className="container py-3">
                    <div className="row">

                      <div className="col-md-3 col-sm-10 mx-auto">
                        <div className="card">
                          <div class="card-header">
                            Job List
                          </div>
                          {this.renderItems()}

                        </div>
                      </div>
                      <div className="col-md-6 col-sm-10 mx-auto">
                        <div className="card">
                          <div class="card-header">
                            Detail
                          </div>
                          <div className="card-body">
                          {this.renderJobDetails()}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-10 mx-auto">
                        <div className="card">
                        <div class="card-header">
                            Skills
                          </div>
                          <ul className="list-group list-group-numbered">
                          {this.renderSkills()}
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default App;