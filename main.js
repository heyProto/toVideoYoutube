import React from 'react';
import ReactDOM from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toMedia = function () {
  this.cardType = 'Media';
}

ProtoGraph.Card.toMedia.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toMedia.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toMedia.prototype.renderCol4 = function (data) {
  this.mode = 'col4';
  ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}


