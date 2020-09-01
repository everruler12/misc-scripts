// Go to a space on Circle.so
// Press F12 to open DevTools (in Chrome)
// Go to Console, copy/paste this code, and press Enter.
// Be patient as it scrolls down and expands all the topics.
// When it's done, it will bring up a dialog to save the output in a .md markdown file
;
(function() {
    var md_name = "Circle Topics.md"

    function include(url) {
        // stop if script already exists
        const els = Array.from(document.getElementsByTagName('script'))
        const duplicates = els.filter(el => el.src == url)
        if (duplicates.length > 0) return

        // add script
        let s = document.createElement('script')
        s.src = url
        document.head.appendChild(s)
    }

    include("https://code.jquery.com/jquery-3.5.1.min.js") // add jQuery
    include("https://unpkg.com/turndown/dist/turndown.js") // add Turndown (to convert HTML to Markdown)

    // wait for jQuery to load
    setTimeout(scrollToBottom, 1000)

    function scrollToBottom() {
        const topics_length = Number($('.nav-link:contains(Topics)').find('.nav-link__count').text())
        const topics_loaded = $('.topic__post').length

        if (topics_loaded < topics_length) {
            // if ($('.author__time:contains(month)').length > 0) { // stop scrolling when see topics over a month old
            $('html').scrollTop($(document).height())

            setTimeout(scrollToBottom, 200)
        } else {
            console.log('stopped scrolling')
            scrape()
        }
    }

    function scrape() {
        const topics = $('.topic__post')

        // Expand "See more"s
        topics.find('label:contains(See more)').click()

        const output = topics.toArray()
            .slice(1) //remove pinned instructions
            .map(parseTopic)
            .join('\n\n')

        download(output, md_name)
    }

    function parseTopic(topic) {
        const name = '[[' + $(topic).find('.author__name').text().trim() + ']]'
        let topic_body = $(topic).find('.topic__inside')
        topic_body.find('.dropdown-menu').remove() // remove extra html from name references

        // convert to Markdown
        var turndownService = new TurndownService()
        const markdown = turndownService.turndown(topic_body.html())

        return name + '\n' + markdown
    }

    function download(text, filename) {
        let a = $('<a>', {
            'href': 'data:text/plaincharset=utf-8,' + encodeURIComponent(text),
            'download': filename,
            'style': 'display:none;'
        }).appendTo('body')
        a[0].click()
        a.remove()
    }

})()
