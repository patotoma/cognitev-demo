import React from 'react';
import PropTypes from 'prop-types';

class App extends React.PureComponent {

  static propTypes = {
    phoneBook: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const initialPage = 0;
    const initialContactsPerPage = 15;

    this.state = {
      newContactInfo: {
        name: '',
        phone: '',
        email: '',
      },
      page: initialPage,
      perPage: initialContactsPerPage,
      activeSearch: false,
      contacts: props.phoneBook.list(initialContactsPerPage, initialPage),
    };
  }

  handleAdd = e => {
    e.preventDefault();
    const pb = this.props.phoneBook;
    const { newContactInfo } = this.state;

    try {
      pb.add(newContactInfo);
      this.setState({
        contacts: pb.list(this.state.perPage, this.state.page),
        newContactInfo: {
          name: '',
          phone: '',
          email: '',
        },
      });
      this._nameInput.focus();
    } catch (e) {
      alert(e.message);
    }
  }

  handleRemove = (index, contact) => {
    const pb = this.props.phoneBook;

    pb.remove(index);
    this.setState({
      contacts: pb.list(this.state.perPage, this.state.page),
    });
  }

  handleSearch = e => {
    const pb = this.props.phoneBook;

    const query = e.currentTarget.value;
    this.setState({
      contacts: query ? pb.search(query) : pb.list(this.state.perPage, this.state.page),
      activeSearch: !!query,
    });
  }

  handlePrev = () => {
    const pb = this.props.phoneBook;
    const newPage = this.state.page - 1;

    this.setState({
      page: newPage,
      contacts: pb.list(this.state.perPage, newPage),
    });
  }

  handleNext = () => {
    const pb = this.props.phoneBook;
    const newPage = this.state.page + 1;

    this.setState({
      page: newPage,
      contacts: pb.list(this.state.perPage, newPage),
    });
  }

  _fillSampleData = () => {
    const pb = this.props.phoneBook;

    pb._fillSampleData();
    this.setState({
      contacts: pb.list(this.state.perPage, this.state.page),
    });
  }

  render() {
    return (
      <div className="container">
        {/* header */}
        <div className="container-header">
          <label htmlFor="search">Search:&nbsp;</label>
          <input
            id="search"
            type="email"
            placeholder="email or phone"
            onChange={this.handleSearch}
          />
        </div>
        <div className="container-subheader">
          <button
            type="button"
            onClick={this._fillSampleData}
          >Fill sample data</button>
        </div>

        <div className="table">
          {/* table header */}
          <div className="tr bold">
            <span className="td">Name</span>
            <span className="td">Phone</span>
            <span className="td">Email</span>
            <span className="td"></span>
          </div>

          {/* map contacts */}
          {this.state.contacts.map((contact, i) =>
            <div className="tr" key={i}>
              <span className="td">{contact.name}</span>
              <span className="td">{contact.phone}</span>
              <span className="td">{contact.email}</span>
              <span className="td">
                <button
                  type="button"
                  onClick={() => { this.handleRemove(i, contact); }}
                >remove</button>
              </span>
            </div>
          )}

          {/* add new contact */}
          <form className="tr" action="" onSubmit={this.handleAdd}>
            <span className="td">
              <input
                ref={c => this._nameInput = c}
                type="text"
                placeholder="John Smith"
                required
                value={this.state.newContactInfo.name}
                onChange={e => this.setState({newContactInfo: {
                  ...this.state.newContactInfo,
                  name: e.currentTarget.value,
                }})}
              />
            </span>
            <span className="td">
              <input
                type="phone"
                placeholder="xx-xxx-xxxx"
                required
                value={this.state.newContactInfo.phone}
                onChange={e => this.setState({newContactInfo: {
                  ...this.state.newContactInfo,
                  phone: e.target.value,
                }})}
              />
            </span>
            <span className="td">
              <input
                type="email"
                placeholder="john.smith@example.com"
                required
                value={this.state.newContactInfo.email}
                onChange={e => this.setState({newContactInfo: {
                  ...this.state.newContactInfo,
                  email: e.target.value,
                }})}
              />
            </span>
            <span className="td">
              <button type="submit">add</button>
            </span>
          </form>
        </div>

        {/* footer */}
        {!this.state.activeSearch &&
          <div className="container-footer">
            <button
              type="button"
              disabled={this.state.page === 0}
              onClick={this.handlePrev}
            >prev</button>
            <span className="page-count">{this.state.page + 1}</span>
            <button
              type="button"
              disabled={this.state.contacts.length < this.state.perPage}
              onClick={this.handleNext}
            >next</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
