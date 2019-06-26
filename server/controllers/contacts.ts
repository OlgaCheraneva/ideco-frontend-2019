import {Request, Response} from 'express';

import Contact from 'models/contact';

export function list(_req: Request, res: Response) {
    const contacts = Contact.findAll();
    res.json(contacts);
}

export function create(req: Request, res: Response) {
    const {id, name, email, phoneNumber, address} = req.body;

    const contact = new Contact({id, name, email, phoneNumber, address});
    contact.save();

    res.sendStatus(201);
}

export function deleteById(req: Request, res: Response) {
    const {id} = req.body;
    Contact.delete(id);
    res.sendStatus(201);
}
