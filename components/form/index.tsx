import React, {Component, FormEvent} from 'react';
import {Button, Row, Col} from 'reactstrap';
import {Form, FormControlProps} from 'react-bootstrap';
import {BsPrefixProps, ReplaceProps} from 'react-bootstrap/helpers';

import {IContactData} from 'types';

interface IFromProps {
    onSubmit(note: IContactData): void;
}

export default class ContactForm extends Component<IFromProps, IContactData> {
    state: IContactData = {
        address: '',
        email: '',
        id: '',
        name: '',
        phoneNumber: '',
    };

    handleInputChange = (event: FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => {
        switch (event.target.id) {            
            case 'formAddress':
                this.setState({address: event.target.value});
                break
            case 'formEmail':
                this.setState({email: event.target.value});
                break
            case 'formName':
                this.setState({name: event.target.value});
                break
            case 'formPhoneNumber':
                this.setState({phoneNumber: event.target.value});
                break
            default:
                break
        }
    }

    handleSubmit = () => {
        this.props.onSubmit({...this.state, id: Date.now().toString()});
        this.setState({
            address: '',
            email: '',
            name: '',
            id: '',
            phoneNumber: '',
        });
    }

    render() {
        const {address, email, name, phoneNumber} = this.state;
        const attributes = [
                {value: name, controlId: 'formName', placeholder: 'ФИО', label: 'ФИО'},
                {value: email, controlId: 'formEmail', placeholder: 'Email', label: 'Email'},
                {value: phoneNumber, controlId: 'formPhoneNumber', placeholder: 'Телефон', label: 'Телефон'},
                {value: address, controlId: 'formAddress', placeholder: 'Адрес', label: 'Адрес'}
            ];

        // Кнопка должна быть активна только тогда, когда все поля заполненны
        const isButtonDisabled = !address || !email || !name || !phoneNumber;

        return (
            <Form className="d-flex flex-column align-items-center">
                {attributes.map((el) => {
                    return (
                        <Form.Group className="w-50" as={Row} controlId={el.controlId}>
                            <Form.Label sm="2" column>{el.label}</Form.Label>
                            <Col>
                                <Form.Control placeholder={el.placeholder} value={el.value} onChange={this.handleInputChange}/>
                            </Col>
                        </Form.Group>
                    )
                })}
                <Button className="btn btn-primary w-25" variant="primary" disabled={isButtonDisabled} type="submit" onClick={this.handleSubmit}>
                    Добавить
                </Button>
            </Form>
        );
    }
}
