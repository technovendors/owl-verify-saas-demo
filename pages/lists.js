import React, {Component} from 'react';
import Link from 'next/link'
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'react-bootstrap';
import querystring from 'querystring';
import { get, post } from '../lib/request';

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createListModal: false,
      newListName: '',
      lists: []
    };

    this.toggleCreateListModel = this.toggleCreateListModel.bind(this);
    this.handleChangeListName = this.handleChangeListName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExport = this.handleExport.bind(this);
  }

  componentDidMount() {
    const data = localStorage.getItem('api_key')
    if (data) {
      get('/email/lists').then((res) => {
        this.setState({
          lists: res.lists
        });
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      Router.push('/');
    }
  }

  toggleCreateListModel() {
    this.setState({
      createListModal: !this.state.createListModal,
      newListName: ''
    });
  }

  handleChangeListName(event) {
    this.setState({
      newListName: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let list_name = this.state.newListName;
    this.toggleCreateListModel();

    post('/email/lists', querystring.stringify({
      list_name
    })).then(function (response) {
      console.log(response);
      Router.push('/lists')
    }).catch(function (error) {
      alert('Please Try Again');
      console.log(error);
    });
  }

  async handleExport(list_id) {
    await get('/email/lists/' + list_id + '/subscribers/export').then((res) => {
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Layout>
        <h1>Subscribers Lists</h1>
        <Modal isOpen="true">
        </Modal>

        <Button
          bsStyle="primary"
          onClick={this.toggleCreateListModel}>
          Create New subscribers List
        </Button>
        <Modal show={this.state.createListModal} onHide={this.toggleCreateListModel}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader closeButton>
              <Modal.Title>
                Create New Subscriber List
              </Modal.Title>
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Name:</label>
                  <input type="text" value={this.state.newListName} onChange={this.handleChangeListName} className="form-control" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button color="danger" onClick={this.toggleCreateListModel}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>

        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>#</th>
            <th>List Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {this.state.lists.map((list, index) => (
            <tr key={list.id}>
              <td>{index + 1}</td>
              <td>{list.list_name}</td>
              <td>
                <Link
                  as={`/list/${list.id}`}
                  href={`/list?id=${list.id}`}>
                  <a>Import CSV</a>
                </Link> /
                <Button onClick={() => {this.handleExport(list.id)}}>
                  Export CSV
                </Button>

              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Layout>
    )
  }
}

export default Lists;
