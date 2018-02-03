import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class toVideoYoutube extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
    };
    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }
    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph-div').getBoundingClientRect();
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      axios.all([
          axios.get(this.props.dataURL),
          axios.get(this.props.schemaURL),
          axios.get(this.props.optionalConfigURL),
          axios.get(this.props.optionalConfigSchemaURL)
      ]).then(
        axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: card.data,
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        })
      );
    }
  }

  componentWillReceiveProps(){
    //Manipulation of form data to change what is shown in the card can be done here
  }

  componentWillMount(){
    //Changes before rendering can be made here
  }

  parseQuery (queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  parseUrl(url) {
    var parser = document.createElement('a'),
      search;
    parser.href = url;
    search = this.parseQuery(parser.search);
    return {
      protocol: parser.protocol, // => "http:"
      host: parser.host,     // => "example.com:3000"
      hostnam: parser.hostname, // => "example.com"
      port: parser.port,     // => "3000"
      pathname: parser.pathname, // => "/pathname/"
      hash: parser.hash,     // => "#hash"
      searchString: parser.search,
      search: search,   // => "?search=test"
      origin: parser.origin   // => "http://example.com:3000"
    };
  }

  renderVideoYoutube() {
    let data = this.state.dataJSON.data;
    let url = this.parseUrl(data.youtube_url);
    return (
      <div className="protograph-toVideoYoutube-youtube">
        {
          url.search.v ?
            <iframe
              width="100%"
              height="250"
              className={`${this.props.mode}`}
              src={`https://www.youtube.com/embed/${url.search.v}`}
              frameBorder="0"
              allowFullScreen>
            </iframe>
          :
            <p className="ui red message">Invalid youtube URL.</p>
        }
      </div>
    )
  }

  renderCol() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.data;
      return (
        <div id="protograph-div" className="protograph-laptop-mode">
          <div className={`protograph-card ${this.props.mode}`}>
            <div className="protograph-toVideoYoutube-youtube-container">{this.renderVideoYoutube()}</div>
          </div>
        </div>
      )
    }
  }
  
  render() {
    return this.renderCol();
  }
}
