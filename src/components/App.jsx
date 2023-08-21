import { Component } from 'react';
import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = localStorage.getItem('contacts');
    const contactsFromLSParced = JSON.parse(contactsFromLS);
    contactsFromLSParced && this.setState({ contacts: contactsFromLSParced });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createUser = userData => {
    const isExist = this.state.contacts.find(contact => {
      return contact.name.toLowerCase() === userData.name.toLowerCase();
    });

    if (isExist) {
      alert(`${userData.name} is already in contacts`);
      return false;
    }

    const newContact = { ...userData, id: nanoid() };

    this.setState(prevState => {
        return { contacts: [...prevState.contacts, newContact] };
      });

     return true;    
  };

  getInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  
  render() {
    const { filter } = this.state;
    const filtered = this.getFilteredContacts()
    return (
      <div className={css.mainContainer}>
        <h1>Phonebook</h1>
        <UserForm createUser={this.createUser}></UserForm>

        <h2>Contacts</h2>
        <Filter filter={filter} getInput={this.getInput}></Filter>

        <Contacts
          contacts={filtered}
          deleteContact={this.deleteContact}
        ></Contacts>
      </div>
    );
  }
}
