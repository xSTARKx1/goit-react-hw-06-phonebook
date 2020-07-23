import React, { Component } from 'react';
import { connect } from 'react-redux';
import phonebookActions from '../../redux/phonebook/phonebook-actions';
import styles from './ContactForm.module.css';

class ContactEditor extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;

    const isUniqueName = this.props.contacts.some(
      contact => contact.name === name,
    );

    if (isUniqueName) {
      alert(`${name} is alredy in contacts`);

      return;
    }

    this.props.onSubmit(this.state);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.handleSubmit}>
          <h3 className={styles.title_form}>Name</h3>
          <input
            className={styles.input}
            value={name}
            name="name"
            onChange={this.handleChange}
          />
          <h3 className={styles.title_form}>Number</h3>
          <input
            className={styles.input}
            value={number}
            name="number"
            onChange={this.handleChange}
          />
          <br />
          <button className={styles.add_contact_btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.phonebook.contacts,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => {
    return dispatch(phonebookActions.addContact(contact));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactEditor);
