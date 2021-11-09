import React from 'react';
import {
    Button,
    // Modal,
    // ModalHeader,
    // ModalBody,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import axios from 'axios';

const SkillsForm = ({ activeItem, setActiveItem, skills, setSkills}) => {
    const handleChange = (e) => {
        let { name, value } = e.target;
        let activeItems;

        console.log(activeItem);
        if(name == 'skills') {
            activeItems = { ...activeItem, skills: [{name: value}]}
        } else activeItems = { ...activeItem, [name]: value};
        setActiveItem(activeItems);
    }
    const axios =require('axios')
    const handleSkillsChange = (e, i) => {
        let { value } = e.target;
        let updatedSkils = [...skills];

        updatedSkils[i]['name'] = value;
        setSkills(updatedSkils)
    }
    async function save(){

        try {
            const body = {
                title: activeItem.title,
                description: activeItem.description,
                job_skill: skills.map(item => ({  skill_name: item.name})) 
            }
                // const res = await fetch('http://localhost:8000/api/todos/');
                const res = axios.post("https://873d-171-49-151-6.ngrok.io/jobs/create", body).then(item => console.log(item))
                
              } catch (e) {
                console.log(e);
            }
    }

    console.log(skills);


    return <Form>
    <h1>Harness Job Manager</h1>
    <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          value={activeItem.title}
          onChange={handleChange}
          placeholder="Title"
        />
    </FormGroup>
    <FormGroup>
        <Label for="description">Description</Label>
        <Input
        type="text"
        name="description"
        value={activeItem.description}
        onChange={handleChange}
        placeholder="Description"
        />
    </FormGroup>
    <FormGroup>
        <Label for="Skills">Skills</Label>
        <div  style={{ display: 'flex', marginRight: '20px'}}>
            <div style={{ width: '100%'}}>
            {skills.map((item, i) =>  <Input
          type="text"
          className="mb-3"
          name="skills"
          value={item.name}
          onChange={(e) => handleSkillsChange(e, i)}
          placeholder="Skills"
        />)}
            </div>
       <div style={{ width: '20px', height: '20px'}}>
       <Button onClick={() => setSkills([...skills, { name: ''}])}>+</Button>

       </div>

        </div>
    </FormGroup>

        <Button color="success" onClick={save}>Save</Button>   
</Form>
}
export default SkillsForm;