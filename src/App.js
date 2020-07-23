import React, { Component } from 'react';
import ContactForm from './components/contactForm';
import ContactList from './components/contactList';
import Filter from './components/Filter';
import styles from './App.module.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm />
        {contacts > 0 && <h2>Contacts</h2>}
        {contacts >= 2 && <Filter />}
        {contacts > 0 && <ContactList />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contacts: state.phonebook.contacts.length,
});

export default connect(mapStateToProps)(App);
