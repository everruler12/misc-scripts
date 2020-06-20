// Download and run [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter/releases)
// Follow these directions to get token https://github.com/Tyrrrz/DiscordChatExporter/wiki/Troubleshooting#first-steps
// Put date for after first day of challenge
// put json file in same folder as this script then past the filename below

var json = require('./Mastermind - General Chat Rooms - memes.json')

var nicknames = [{
        username: 'Erik (everruler)',
        nickname: 'Erik'
    }
]

var res = json.messages
    .filter(m => m.attachments.length > 0)
    .map(message => {
        return {
            name: message.author.name,
            timestamp: message.timestamp,
            media: message.attachments[0].url
        }
    })

var names = [...new Set(res.map(message => message.name))]

var res2 = names
    .map(name => {
        var nickname = nicknames.filter(n => n.username == name).length > 0 ? nicknames.filter(n => n.username == name)[0].nickname : name.split(/[-\(]/)[0].trim()
        return {
            name: nickname,
            count: res.filter(message => message.name == name).length
        }
    })
    .sort((a, b) => (a.count < b.count) ? 1 : -1)

console.log('Script ran at: ' + new Date())
console.log(res2)
console.log('\nTop 5 Meme Contributors:\n' + res2.filter((x, i) => i < 5).map((x, i) => (i + 1) + ') ' + x.name).join('\n'))
