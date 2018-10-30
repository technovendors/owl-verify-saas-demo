import React, { Component } from 'react';
import { get } from '../lib/request';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uploadStatus: false
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  queryParams(params) {
    return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  handleUpload(ev) {
    ev.preventDefault();

    let file = this.uploadInput.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('list_id', this.props.list_id);

    let url = '/email/lists/' + this.props.list_id + '/subscribers/import';
    url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams({
        fileName: file.name,
        fileType: file.type
    });

    get(url).then((res) => {
      let signedUrl = res.data;
      console.log(signedUrl);
      fetch(signedUrl, {
        method: "put",
        body: file,
      }).then(function (response) {
        // this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });

        console.log(response);
        alert('File Uploaded successfully');
      }).catch(function (error) {
        console.log(error);
      });

    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input
              className="form-control"
              ref={(ref) => { this.uploadInput=ref; }}
              type="file" />
          </div>

          <button className="btn btn-success">Upload</button>
        </form>
      </div>
    )
  }
}

export default FileUpload;
