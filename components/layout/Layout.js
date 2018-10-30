import { Component } from 'react';
import Head from 'next/head';
import Header from './Header';

class Layout extends Component {
    render() {
        return (
            <div>
              <Head>
                <meta
                 name="viewport"
                 content="width=device-width, initial-scale=1" />
                <meta
                  charSet="utf-8" />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css"
                />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <link
                  rel="icon"
                  href="static/favicon.ico"
                />
              </Head>
              <style jsx global>
                {`
                  body {
                  }
                  .navbar {
                    border-radius: 0;
                  }
                `}
              </style>
              <Header />
              <div className="container-fluid">
                  <section>{this.props.children}</section>
              </div>
            </div>
        )
    }
}

export default Layout;
