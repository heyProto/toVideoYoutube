import React from 'react';
import ReactDOM from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toVideoYoutube = function () {
  this.cardType = 'VideoYoutube';
}

ProtoGraph.Card.toVideoYoutube.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toVideoYoutube.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toVideoYoutube.prototype.renderCol2 = function (data) {
  this.mode = 'col2';
  this.render();
}

ProtoGraph.Card.toVideoYoutube.prototype.renderCol3 = function (data) {
  this.mode = 'col3';
  this.render();
}
ProtoGraph.Card.toVideoYoutube.prototype.renderCol4 = function (data) {
  this.mode = 'col4';
  this.render();
}
ProtoGraph.Card.toVideoYoutube.prototype.renderCol7 = function (data) {
  this.mode = 'col7';
  this.render();
}
ProtoGraph.Card.toVideoYoutube.prototype.renderCol16 = function (data) {
  this.mode = 'col16';
  this.render();
}
ProtoGraph.Card.toVideoYoutube.prototype.render = function (data) {
  ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      mode={this.mode}
      siteConfigURL={this.options.site_config_url}
      siteConfigs={this.options.site_configs}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}
