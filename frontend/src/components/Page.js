import React from 'react'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import {Logger, ConsoleLogger} from 'react-console-logger';
import Map from "./Map";
const Api = require('../lib/Api.js')
          const myLogger = new Logger();

class PageComponent extends React.Component {

  render() {
    if (this.state.loading) {
      return null
    }

    return (

   

      <Grid>
        <Row>
          <Col xs={12} md={12}>

            {this.state.flashMessage.message &&
              <Grid>
                <Row>
                  <Col xs={12} md={12}>
                    <Alert bsStyle={this.state.flashMessage.style}>
                      {this.state.flashMessage.message}
                    </Alert>
                  </Col>
                </Row>
              </Grid>
            }

            <div>
            
            {this.state.page.content}
                {this.state.users.map((user, index) => (
                      <Map
                      id="myMap"
                      options={{
                        center: { lat: 41.0082, lng: 28.9784 },
                        zoom: 8
                      }}
                      onMapLoad={map => {
                        var marker = new window.google.maps.Marker({
                          position: { lat: user.latitude, lng: user.longitude },
                          map: map,
                          title: user.email
                        });

                          var marker = new window.google.maps.Marker({
                          position: { lat: user.latitude, lng: user.longitude },
                          map: map,
                          title: user.email
                        });
                      var marker = new window.google.maps.Marker({
                          position: { lat: 41.0082, lng: 28.9784 },
                          map: map,
                          title: user.email
                        });
    
                      }}
                    />
                ))}    
            </div>

          </Col>
        </Row>
      </Grid>
    )
  }

  componentDidMount() {
    this.getPage()
    const myLogger = new Logger();
    Api.getUsers().then(response => {
      if (response) {
        this.setState({
          users: response,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false,
          flashMessage: {
            message: 'Access Denied.',
            style: 'danger'
          }
        })
      }
    })
 
  }

  componentWillReceiveProps(nextProps) {

    
    let prevPageId = this.props.match.params.id
    let newPageId = nextProps.match.params.id

    Api.getUsers().then(response => {
      if (response) {
        this.setState({
          users: response,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false,
          flashMessage: {
            message: 'Access Denied.',
            style: 'danger'
          }
        })
      }
    })

    // check if page component is being reloaded with new page props && reload page from Api
    if (prevPageId !== newPageId) {
      this.setState({
        page: {
          id: newPageId,
          content: ''
        }
      })
      this.getPage(newPageId)
    }
  }

  getPage(pageId = null) {
    pageId = pageId || this.state.page.id

    this.setState({
      loading: true,
      flashMessage: {
        message: undefined,
        style: 'success'
      }
    })

    let jwt = this.props.appState.jwt
    Api.getPage(jwt, pageId).then(response => {
      if (response) {
        this.setState({
          page: response,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false,
          flashMessage: {
            message: 'Access Denied.',
            style: 'danger'
          }
        })
      }
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      page: {
        id: props.match.params.id,
        content: ''
      },
      loading: true,
      flashMessage: {
        message: undefined,
        style: 'success'
      }
    }

  }

}

export default PageComponent
