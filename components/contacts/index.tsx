import React, { Component } from 'react';
import {Button, Table} from 'reactstrap';

import {IContactData} from 'types';

interface IContactsProps {
    contacts: IContactData[];
    deleteContact(id: string): void;
}
export default class Contacts extends Component<IContactsProps, IContactData> {
    render() {
        const {contacts} = this.props;

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>ФИО</th>
                        <th>E-mail</th>
                        <th>Телефон</th>
                        <th>Адрес</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => {
                        return (
                            <tr>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{contact.address}</td>
                                <td><Button className="btn btn-danger"
                                    onClick={() => this.props.deleteContact(contact.id)}>Удалить</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}
