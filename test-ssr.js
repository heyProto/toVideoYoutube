var SSR = require('./dist/0.0.1/ssr-card.min.js')
var state = {
    "dataJSON": {
        "data": {
            "youtube_url": "https://www.youtube.com/watch?v=CtP4crE9LxE",
            "title": "Title"
        }
    }
}
SSR.render("col3", state)