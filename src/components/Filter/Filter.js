import React from 'react';
import phonebookActions from '../../redux/phonebook/phonebook-actions';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Filter = ({ value, changeFilter }) => (
  <>
    <label className={styles.filter_title}>
      Find contacts by name <br />
      <input type="text" value={value} onChange={changeFilter} />
    </label>
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.phonebook.filter,
});

const mapDispatchToProps = dispatch => ({
  changeFilter: e => dispatch(phonebookActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
