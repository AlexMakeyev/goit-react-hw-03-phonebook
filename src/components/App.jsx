import React from "react";
import { FormPhone } from "./Form/Form";
import { Contacts } from "./Contacts/Contacts";
import Filter from "./Filter/Filter";

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    
  };

  submitHandler = data =>{
    this.setState(({ contacts }) => {
      if (!this.haveDuplicates(contacts, data)) {
        return { contacts: [data, ...contacts] };
      } else {
        alert(`${data.name} is already in contacts`);
      }
    });
  };
  haveDuplicates = (contacts, data) => {
    return contacts.some(contact => contact.name === data.name);
  };
  deleteContact = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState(() => {
      return { contacts: filteredContacts };
    });
  };

  onChangeFilter = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  returnFilteredContacts() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };
  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
  }
  componentDidUpdate (prevProps, prevState) {
    if(this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }

  }


  render() {

    return (<div>
      <h1>Phonebook</h1>
      <FormPhone submit ={this.submitHandler} />
      <h2>Contacts</h2>
      <Filter value={this.state.filter} onChange={this.onChangeFilter} />
      <Contacts  contacts={this.returnFilteredContacts()}
          onDelete={this.deleteContact} />
      



      </div>)
  }
};
//Контакты contacts={this.returnFilteredContacts()}