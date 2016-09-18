from flask import Flask, request
import emoji
import emojicodes
import init
import json
app = Flask(__name__)

@app.route('/')
def hello_world():
    s = u''
    words_list = ['lol', 'bye', 'unicorn', 'frog', 'screwed', 'happy', 'love', 'home', 'tomorrow', 'see', 'lmao', 'muah', 'going home', 'hahaha', 'xoxo', 'love dogs', 'dancing', 'playing violin', 'playing', 'violin']
    for word in words_list:
        l = init.most_similar_emojis_sentence(word)
        s += '<p>' + word
        for e in l:
            print e
            print emojicodes.toalias(e[4:])[0]
            s += emoji.emojize(emojicodes.toalias(e[4:])[0], use_aliases=True)
    return s

@app.route('/q')
def query():
    text = request.args.get('text')
    em = init.most_similar_emojis_sentence(text)
    s = u''
    for e in em:
        emoji_alias = emojicodes.toalias(e[4:])
        if len(emoji_alias) == 0:
            continue
        s += emoji.emojize(emoji_alias[0], use_aliases=True) + ','
    #return json.dumps(s)
    return s[:-1]

if __name__ == '__main__':
    app.run(debug=True)