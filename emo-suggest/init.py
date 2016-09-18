from gensim import models
from pprint import pprint
from nltk.corpus import stopwords
import numpy as np
import scipy as sp
import string


stop = set(stopwords.words('english'))
emoji_model = models.Word2Vec.load('emoji_model')

'''
print len(emoji_model.vocab)
ls = emoji_model.vocab.keys()
with open('all_words.txt', 'w') as f:
    f.write('\n'.join(ls))
with open('emojis.txt', 'w') as f:
    n = [w for w in ls if w.startswith('eoji')]
    f.write('\n'.join(n))
'''

emoji_tokens = set()
with open('emojis.txt', 'r') as f:
    for line in f:
        emoji_tokens.add(line[:-1])

all_tokens = set()
with open('all_words.txt', 'r') as f:
    for line in f:
        all_tokens.add(line[:-1])


def most_similar_emojis_word(word):
    temp = {}
    for emoji in emoji_tokens:
        temp[emoji] = emoji_model.similarity(word, emoji)
    ls = sorted(temp.items(), key=lambda k: k[1], reverse=True)[:5]
    ls = [e[0] for e in ls]
    print ls
    return ls

def get_sent_vector(tokens):
    vec = np.zeros((300,))
    for word in tokens:
        vec = np.add(vec, emoji_model[word])
    return vec

def cosine_similarity(vec1, vec2):
    return 1 - sp.spatial.distance.cosine(vec1, vec2)



#Total sentece vector
def most_similar_emojis_sentence(sent):
    sent_tokens = [w for w in sent.lower().split(' ') if w not in stop and w in all_tokens]
    print sent_tokens
    if len(sent_tokens) == 0:
        return []
    if len(sent_tokens) == 1:
        return most_similar_emojis_word(sent_tokens[0])
    
    sent_vec = get_sent_vector(sent_tokens)

    temp = {}
    for emoji in emoji_tokens:
        temp[emoji] = cosine_similarity(sent_vec, emoji_model[emoji])
    ls = sorted(temp.items(), key=lambda k: k[1], reverse=True)[:5]
    ls = [e[0] for e in ls]
    return ls

'''
def most_similar_emojis_sentence(sent):
    sent_tokens = [w for w in sent.lower().split(' ') if w not in stop and w in all_tokens]
    print sent_tokens
    if len(sent_tokens) == 0:
        return ''
    if len(sent_tokens) == 1:
        return most_similar_emojis_word(sent_tokens[0])
    
    best_emojis = []
    for tok in sent_tokens:
        
        for emoji in emoji_tokens:
            temp[emoji] = cosine_similarity(sent_vec, emoji_model[emoji])
        e, d = sorted(temp.items(), key=lambda k: k[1], reverse=True)[0]
        best_emojis.append(e)
        np.subtract(sent_vec, emoji_model[e])
    return best_emojis[:5]
    '''