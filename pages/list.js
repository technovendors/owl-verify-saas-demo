import React, { Component } from 'react';
import Layout from "../components/layout/Layout";
import FileUpload from "../components/FileUpload";
import Router from "next/dist/lib/router";

class Content extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const data = localStorage.getItem('api_key')
    if (data) {
      if (this.props.list_id) {

      } else {
        Router.push('/');
      }
    } else {
      Router.push('/lists');
    }
  }

  render() {
    return (
      <Layout>
        <h1>Upload CSV</h1>
        <FileUpload list_id={this.props.list_id} />
      </Layout>
    )
  }
}

Content.getInitialProps = async function (context) {
    const { id } = context.query;

    console.log(id);

    return {
        list_id: id
    }
};

export default Content;
