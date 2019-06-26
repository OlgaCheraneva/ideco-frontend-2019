import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, Fragment} from 'react';

import Contacts from '../components/contacts';
import Form from '../components/form';

import {IContactData} from 'types';

interface IListPageProps {
    contacts: IContactData[];
}

interface IListPageState {
    contacts: IContactData[];
    loading: boolean;
}

export default class IndexPage extends Component<
    IListPageProps,
    IListPageState
> {
    state: IListPageState = {
        contacts: [],
        loading: true
    };

    componentDidMount() {
        this.fetchContacts();
    }

    fetchContacts = () => {
        fetch('/api/contacts')
            .then((response) => response.json())
            .then((contacts) => this.setState({loading: false, contacts}));
    }

    deleteContact = (id: string) => {
        fetch('/api/deletion', {
            body: JSON.stringify({id}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        })
            .then(this.fetchContacts);
    }

    handleSubmit = (contact: IContactData) => {
        fetch('/api/contacts', {
            body: JSON.stringify(contact),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        })
            .then(this.fetchContacts);
    }

    render() {
        const {contacts, loading} = this.state;

        return (
            <Fragment>
                {
                    loading ? <p>Загрузка...</p> : !contacts.length ? <p>Контакты не найдены.</p> :
                    <Contacts contacts={contacts} deleteContact={this.deleteContact}/>
                }
                <Form onSubmit={this.handleSubmit}/>
            </Fragment>
        );
    }
}
