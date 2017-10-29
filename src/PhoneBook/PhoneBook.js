import _mockData from './_mockData.js';

class PhoneBook {

  constructor(options = {}) {
    this.nameMaxCharactes = options.nameMaxCharactes || 100;
    this.contactsLimit = options.contactsLimit || 10000;
    this.phoneRegExp = options.phoneRegExp || /^[0-9]{2}-[0-9]{3}-[0-9]{4}$/;
    this.emailRegExp = options.emailRegExp || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.debug = options.debug || false;

    // private list of contacts
    this._data = [];
  }

  // add new contactInfo to list
  // contactInfo = {
  //   name: String, // less than 100 chars
  //   phone: String, // format xx-xxx-xxxx
  //   email: String // valid email address
  // }
  add = contactInfo => {
    if (this.debug) {
      console.log('add', contactInfo);
    }

    if (
      !contactInfo
      || typeof(contactInfo) !== 'object'
      || Array.isArray(contactInfo)
    ) {
      return;
    }

    // validations
    if (typeof(contactInfo.name) !== 'string') {
      throw new Error('name should be a string');
    }
    if (contactInfo.name.length >= this.nameMaxCharactes) {
      throw new Error('name should have less than ' + this.nameMaxCharactes + ' characters');
    }
    if (typeof(contactInfo.phone) !== 'string') {
      throw new Error('phone number should be a string');
    }
    if (!this.phoneRegExp.test(contactInfo.phone)) {
      throw new Error('phone number should be in xx-xxx-xxxx format');
    }
    if (typeof(contactInfo.email) !== 'string') {
      throw new Error('email address should be a string');
    }
    if (!this.emailRegExp.test(contactInfo.email)) {
      throw new Error('please enter valid email address');
    }
    if (this._data.length === this.contactsLimit) {
      throw new Error('maximum number of contacts have been reached');
    }

    this._data.push(contactInfo);
  }

  // simple remove by index
  remove = index => {
    if (this.debug) {
      console.log('remove', index);
    }

    if (this._data[index]) {
      this._data.splice(index, 1);
    }
  }

  // query is contact name or contact phone number
  search = query => {
    if (this.debug) {
      console.log('search', query);
    }

    if (!query) {
      return this._data;
    }

    return this._data.filter(contactInfo => {
      var queryLowerCase = query.toLowerCase();
      var nameLowerCase = contactInfo.name.toLowerCase();
      return nameLowerCase.startsWith(queryLowerCase) || contactInfo.phone.startsWith(queryLowerCase);
    });
  }

  // return sorted list of contacts
  // order should be alphabetically by name
  // page is index from 0
  list = (contactsPerPage, page) => {
    if (this.debug) {
      console.log('list', contactsPerPage, page);
    }

    if (!contactsPerPage) {
      contactsPerPage = 25;
    }
    if (!page) {
      page = 0;
    }

    // sort by name
    var sortedData = this._data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // slice
    var startIndex = page * contactsPerPage;
    var endIndex = startIndex + contactsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }

  // fill PhoneBook will mocked testing data
  _fillSampleData = () => {
    _mockData.forEach(contact => {
      this.add(contact);
    });
  }
}

export default PhoneBook;
