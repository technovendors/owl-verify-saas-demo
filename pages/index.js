import React, {Component} from 'react';
import Layout from '../components/layout/Layout';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const data = localStorage.getItem('api_key')
    if (data) {
      this.setState({
        apiKey: data,
      });
    }
  }

  handleInput(event) {
    localStorage.setItem('api_key',
      event.target.value.toString()
    );

    this.setState({
      apiKey: event.target.value
    });
  }

  render() {
    return (
      <Layout>
        <Jumbotron className="text-center">
          <h1>
            Owl-verify SAAS APIs + Nextjs
          </h1>

          <p>
            enter your api key in below input box and
            start visiting other pages to access your data
          </p>

          <div className="row">
            <div className="form-group col-md-4 col-md-offset-4">
              <input
                type="text"
                value={this.state.apiKey}
                onChange={this.handleInput}
                className="form-control"
                placeholder="API Key" />
            </div>
          </div>
        </Jumbotron>
      </Layout>
    )
  }
}

export default Index;
