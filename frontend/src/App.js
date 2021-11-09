import React, { Component } from "react"
import Modal from "./components/Modal"; 
import axios from "axios";
import SkillsForm from "./components/SkillsForm";

const App = () => {
    const [activeItem, setActiveItem] = React.useState({
        title: "",
        description: "",
        // completed: false,
        skills: [{ name: ''}],
      })
      const [skills, setSkills] = React.useState([{ name: ''}]);

      console.log(activeItem);

    // state = {
    //   viewCompleted: false,
    //   activeItem: {
    //     title: "",
    //     description: "",
    //     // completed: false,
    //     skills: [],
    //   },
    //   todoList: []
    // };

    // async componentDidMount() {
    //   try {
    //     // const res = await fetch('http://localhost:8000/api/todos/');
    //     const res = await fetch('https://86d0-171-61-61-114.ngrok.io/jobs/get_jobs_list');
    //     const todoList = await res.json();
    //     this.setState({
    //       todoList
    //     });
    //   } catch (e) {
    //     console.log(e);
    // }
    // }

    // toggle = () => {
    //   this.setState({ modal: !this.state.modal });
    // };
  
    // //Responsible for saving the task
    // handleSubmit = item => {
    //   this.toggle();
    //   if (item.id) {
    //     axios
    //       .put(`http://localhost:8000/api/todos/${item.id}/`, item)
    //     return;  
    //   }
    //   axios
    //     .post("http://localhost:8000/api/todos/", item)
    // };

    // createItem = () => {
    //   const item = {title: "", description: "", completed: false };
    //   this.setState({ activeItem: item, modal: !this.state.modal });
    // };

   
    // renderTabList = () => {
    // };

    // // renderItems = () => {
    //   const { viewCompleted } = this.state;
    //   const newItems = this.state.todoList.filter(
    //     item => item.completed === viewCompleted
    //   );
    //   return newItems.map(item => (
    //     <li 
    //       key={item.id}
    //       className="list-group-item d-flex justify-content-between align-items-center"
    //     >
    //       <span 
    //         className={`todo-title mr-2 ${
    //           this.state.viewCompleted ? "completed-todo" : ""
    //         }`}
    //         title={item.description}
    //         >
    //           {item.title}
    //         </span>
    //     </li>
    //   ));
    // };

      return (
        <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Harness Job Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
              <SkillsForm activeItem={activeItem} setActiveItem={setActiveItem} skills={skills} setSkills={setSkills} />
            {/* <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div> */}
          </div>
        </div>
        {/* {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null} */}
      </main>
      )
    }

  
export default App;