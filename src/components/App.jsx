import { Component } from 'react';
import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

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
    // console.log('Компонент App змонтувався');
    const contactsFromLS = localStorage.getItem('contacts');
    const contactsFromLSParced = JSON.parse(contactsFromLS);
    // console.log('contactsFromLS:', contactsFromLS);
    // console.log('contactsFromLSParced:', contactsFromLSParced);
    // Перевірка, чи є щось у LS. Якщо немає, то нічого в state не додаємо.
    contactsFromLSParced && this.setState({ contacts: contactsFromLSParced });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('Компонент App оновився');

    if (this.state.contacts !== prevState.contacts) {
      // console.log('prevState.contacts', prevState.contacts);
      // console.log('this.state.contacts:', this.state.contacts);
      // console.log('оновився масив contact');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createUser = userData => {
    const isExist = this.state.contacts.find(contact => {
      return contact.name === userData.name;
    });

    if (isExist) {
      alert(`${userData.name} is already in contacts`);
    } else {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, userData] };
      });

      return userData.name;
    }
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

  render() {
    // console.log('Компонент App зарендерився');

    const { filter, contacts } = this.state;
    return (
      <div className={css.mainContainer}>
        <h1>Phonebook</h1>
        <UserForm createUser={this.createUser}></UserForm>

        <h2>Contacts</h2>
        <Filter filter={filter} getInput={this.getInput}></Filter>

        <Contacts
          contacts={
            filter
              ? contacts.filter(({ name }) =>
                  name.toLowerCase().includes(filter.toLowerCase())
                )
              : contacts
          }
          deleteContact={this.deleteContact}
        ></Contacts>
      </div>
    );
  }
}

// & Фаза монтування
// ~ componentDidMount() {} - компонент БУВ змонтований.
// Викликається один раз за життєвий цикл компоненту.
// Викликати його вдруге можна лише коли компонент був розмонтований

// & Фаза оновлення (коли змінений стан компоненту (this.state), або приходять нові props)
// ~ componentDidUpdate(prevProps, prevState, snapshot) {} - компонент БУВ оновився.
// Викликається після кожного оновлення (першого render() і всіх наступних render())
// Може викликатися скільки завгодно разів.
// Не можна в ньому (і у render()) викликати this.setState() без перевірки - буде зациклювання.
// prevProps, prevState - відповідні значення до моменту оновлення
// snapshot - те, що приходить з методу getSnapshotBeforeUpdate
// ~ static getDerivedStateFromProps(nextProps, prevState) {} - Дуже  рідко використовується
// ~ shouldComponentUpdate(nextProps, nextState) {} - чи має компонент оновлюватись?
// Використовується для оптимізації, щоб не перемальовувати рендер.

// ~ getSnapshotBeforeUpdate(prevProps, prevState) {} - Етап Pre-commit. Дуже  рідко використовується
// Читає DOM перед самим оновленням (наприклад, щоби прокрутити скрол на своє місце після додавання коментаря)

// & Фаза розмонтування
// ~ componentWillUnmount - компонент БУДЕ розмонтований
// Викликається коли компонент видаляється. Використовується для зняття слухачів подій і лічильників (.removeEventListener('type', listener), clearTimeout(timerId), clearInterval(timerId))
