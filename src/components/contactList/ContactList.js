import React from 'react';
import Proptypes, { shape } from 'prop-types';
import Contact from './Contact';
import phonebookActions from '../../redux/phonebook/phonebook-actions';
import styles from './ContactList.module.css';
import { connect } from 'react-redux';

const ContactList = ({ contacts, onDeleteContact, onChangeFilter }) => (
  <>
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={styles.contact}>
          <Contact
            name={name}
            number={number}
            id={id}
            onDeleteContact={() => {
              onDeleteContact(id);

              if (contacts.length === 1) {
                onChangeFilter();
              }
            }}
          />
        </li>
      ))}
    </ul>
  </>
);

ContactList.propTypes = {
  contacts: Proptypes.arrayOf(
    shape({
      id: Proptypes.string.isRequired,
    }),
  ),
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ phonebook: { contacts, filter } }) => ({
  contacts: getVisibleContacts(contacts, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(phonebookActions.deleteContact(id)),
  onChangeFilter: () => dispatch(phonebookActions.changeFilter('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
