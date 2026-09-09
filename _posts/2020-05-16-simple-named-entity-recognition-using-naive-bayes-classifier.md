---
layout: post
title: "Simple Named Entity Recognition using Naive Bayes Classifier"
date: 2020-05-16
medium_url: "https://akshaymewada.medium.com/simple-named-entity-recognition-using-naive-bayes-classifier-2421f92c5b1e"
excerpt: "Named Entity Extraction import subtask of Information Extraction. The Named Entity Extraction is still exploring."
tags: ["entity","naive bayes","chatbots"]
---

Named Entity Extraction import subtask of Information Extraction. The Named Entity Extraction is still exploring.

Originally published on [Medium](https://akshaymewada.medium.com/simple-named-entity-recognition-using-naive-bayes-classifier-2421f92c5b1e).

> Named entity extraction is subtask of information extraction which classify the text(unstructred text) data in predefined classes.

Let's take an example to understand how named entity extraction is useful for information extraction.

> What is the time?
After analyzing the question we can say that user intents to get the current time. Where time is DateTime entity. So the answer will be,

> The time is 8:20 PM

where 8:20 PM is the current time.

Let us build an entity classifier using python. In this, we will understand how the named entity gets classified. In the end, we will create a chatbot using the simple ner classifier.
### Named Entity Recognition Data

Let’s get training data to entity.yaml in which the text and its contained entity is given. In which john, steve, etc is an entity i.e. name.

```
- text: myself john
    entity:
        - pos: 2
          name: john
- text: i am roger
    entity:
        - pos: 3
          name: roger
- text: steve here
    entity:
        - pos: 1
          name: steve
- text: hey myself david
    entity:
        - pos: 3
          name: david

```

Add more data for better results.
### Train NER Classifier

Load the entity data file.

```
import yaml
with open('ent.yaml', 'r') as f:
    data =  yaml.load(f)

```

The get_features function helps to generate features for training. The function provides the current word relation with previous and next words. It also maintains the pos-tag relation of the given word.

```
from nltk.tag import pos_tag
import numpy as np

def get_features(index, word, tokens):
    prev_word = 'BOS'
    next_word = 'EOS'
    if len(tokens) > index+1:
        next_word = tokens[index+1]
    if index-1 > 0:
        prev_word = tokens[index-1]
    val, tag = pos_tag([word])[0]
    prev_word, prev_tag = pos_tag([prev_word])[0]
    next_word, next_tag = pos_tag([next_word])[0]
    dic = {
        "word": val,
        "postag": tag,
        "nextword": next_word,
        "nextwordtag": next_tag,
        "previousword": prev_word,
        "previoustag": prev_tag,
    }
    return dic
```

Let us generate labels and features for named entity extraction.

```
train_data = []
label = []
for dic in data:
    token = dic['text'].split(' ')
    for i, word in enumerate(token):
        if dic.__contains__('entity'):
            for ent in dic['entity']:
                pos = ent['pos']
                k, v = list(ent.items())[1]
                if pos == i+1:
                    label.append(k)
                    break
            else:
                label.append('O')
        else:
            label.append('O')
        train_data.append(get_features(i ,word, token))
```

> Converting text dictionary into a related number vectors.

```
from sklearn.feature_extraction import DictVectorizer
vec = DictVectorizer()
feature = vec.fit_transform(train_data).toarray()

```

Using the Naive Bayes classifier to classify the entity.

```
from sklearn.naive_bayes import BernoulliNB
bnb = BernoulliNB()
bnb.fit(feature, label)

```

Lets test named entity classifier using get_enitity function.

```
def get_enitity(sentence):
    new = []
    tokens = sentence.split(" ")
    for i,val in enumerate(tokens):
        new.append(get_features(i, val, tokens))

    pred = bnb.predict(vec.transform(new).toarray())
    for i in np.where(pred!='O')[0]:
        print(text.split(" ")[i])

```

Test Result is:
For, Hey I am Raju
It will classify the Raju as an entity.
## Conclusion

Throughout we have learned how simply named entity recognition created using Naive Bayes. We learned how to extract information from text.

For fun, you can integrate [Intent Classifier]({{ '/posts/simple-chatbot-using-randoforest/' | relative_url }}) and Entity Classifier to web API for good conversation chatbot. You can find a simple example [here](https://github.com/AkshayMewada/Simple-Chatbot) .
## What Next?

  * We can improve the entity classifier by adding more training data and tuning models.
  * For advancement, we can go with models like Conditional Random Field(CRF), Bidirectional Encoder Representations from Transformers(BERT)

After reading this article I am sure you learned the basic entity classifier and how it works.

I would like your suggestions…..

Thank you!!!

