import React from 'react';
import { render } from 'react-dom';
import EditCard from './src/js/edit_card.jsx';

ProtoGraph.Card.toVideoYoutube.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toVideoYoutube.prototype.renderSEO = function(data) {
    this.renderMode = 'SEO';
    return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toVideoYoutube.prototype.renderEdit = function(onPublishCallback) {
    this.mode = 'edit';
    this.onPublishCallback = onPublishCallback;
    render( <
        EditCard dataURL = { this.options.data_url }
        schemaURL = { this.options.schema_url }
        uiSchemaURL = { this.options.ui_schema_url }
        siteConfigURL = { this.options.site_config_url }
        onPublishCallback = { this.onPublishCallback }
        mode = { this.mode }
        ref = {
            (e) => {
                this.containerInstance = this.containerInstance || e;
            }
        }
        />,
        this.options.selector);
}