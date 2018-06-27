import React from 'react'
import { renderToString } from 'react-dom/server'
import Card from './src/js/card.jsx'

global.window = {}

function getInstance(){
    return new ProtoGraph.Card.toStory();
}

function renderWithMode(mode) {
    switch (mode) {
        case "col2":
            return "x.renderCol2()";
        case "col3":
            return "x.renderCol3()";
        case "col4":
            return "x.renderCol4()";
        case "col7":
            return "x.renderCol7()";
        case "col16":
            return "x.renderCol16()";
        default:
            return "x.renderCol4()";
    }
}

function getScriptString(mode, dataJSON, selector, site_configs) {
    return `<script>
            var x = new ProtoGraph.Card.toVideoYoutube(),
                params = {
                    "selector": document.querySelector('${selector}'),
                    "isFromSSR": true,
                    "initialState": ${JSON.stringify(dataJSON)},
                    "site_configs": ${JSON.stringify(site_configs)}
                };
            x.init(params);
            ${renderWithMode(mode)}
        </script>
    `
}

function render(mode, initialState) {
    let content = renderToString(
        <Card
            dataJSON={initialState.dataJSON}
            mode={mode}
            renderingSSR={true}
        />
    );

    return { content, initialState };
}

module.exports = {
    render: render,
    getScriptString: getScriptString,
    getInstance: getInstance
}