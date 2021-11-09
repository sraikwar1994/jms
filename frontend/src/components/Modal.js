import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";


export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        let activeItem;
        if(name == 'skills') {
            activeItem = { ...this.state.activeItem, [name]: [...this.state.activeItem.skills, value]}
        } else activeItem = { ...this.state.activeItem, [name]: value};
        this.setState({ activeItem });
    };
    render() {
        const { toggle, onSave } = this.props;
        console.log(this.state);

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Harness Job Manager</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                              type="text"
                              name="title"
                              value={this.state.activeItem.title}
                              onChange={this.handleChange}
                              placeholder="Enter Job Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={this.state.activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter Job description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Skills">Skills</Label>
                            <Input
                              type="text"
                              name="skills"
                              value={this.state.activeItem.skills}
                              onChange={this.handleChange}
                              placeholder="Skills"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}