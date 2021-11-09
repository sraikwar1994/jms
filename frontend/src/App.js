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
            jobList: []
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
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`job-title mr-2`}
                    title = {item.description}
                >
                    {item.title}
                </span>
            </li>
        ));
    };

    render() {
        return (
            <main className="content">
                <div className="row">
                  <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                      <ul className="list-group list-group-flush">
                      {this.renderItems()}
                      </ul>
                    </div>
                  </div>
                </div>
            </main>
        )
    }
}

export default App;