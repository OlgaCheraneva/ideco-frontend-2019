import {IContactData} from 'types';

let storage: Contact[] = [];

class Contact {
    static findAll(): Contact[] {
        return storage;
    }

    static delete(id: string): void {
        storage = storage.filter((contact: IContactData) => contact.id !== id);
    }

    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;

    constructor({id, name, email, phoneNumber, address}: IContactData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    save(): void {
        storage.push(this);
    }
}

export = Contact;
