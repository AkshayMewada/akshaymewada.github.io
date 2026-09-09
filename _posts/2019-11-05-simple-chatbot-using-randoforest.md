---
layout: post
title: "Simple Chatbot Using RandomForest"
date: 2019-11-05
medium_url: "https://akshaymewada.medium.com/simple-chatbot-using-randoforest-3106ea2b523e"
excerpt: "Chatbots are an important part of the industry. Approx 80% of customer services will be handled by chatbots in 2020."
tags: ["machine learning","chatbot","randomforest","python"]
---

Chatbots are an important part of the industry. Approx 80% of customer services will be handled by chatbots in 2020.

Originally published on [Medium](https://akshaymewada.medium.com/simple-chatbot-using-randoforest-3106ea2b523e).

> “A chatbot is an AI software system that assists or chats with a human in natural language to provide information, fulfill the tasks.”

Let's understand the chatbot architecture and flow.
### Chatbot Flow

The chatbot flow is based on three main components Intention, Keywords, Chatflow.

![Chatbot flow diagram]({{ '/assets/images/posts/medium/chatbot-flow.webp' | relative_url }})

```
#Example
User: What is one plus one?
Bot: one plus one is two.
```

  * Intention or Intent:
The intent is known as user intention like what the user wants to say, for what he asked the question. In the above example, we can see the user intents to Addition two numbers.
  * Keywords or Entities:
The Entities is known as the thing user want information about.
In the above example, we can see that extracted entities are Operation i.e. Plus and Numbers i.e. One, One. On these entities, the bot will run its custom actions.
  * Chatflow:
The chat flow is the backbone of chatbot conversation. The conversation between user and chatbot must be similar like two human beings are talking to each other. The chat flow gives the chatbot task what chatbot should do on the basis of user intention, previous intention.
In the above example, the chat-flow gives action for given user intent is Addition operation. All the operations and responses are generated in the Actions and Responses section.
  * Actions and Responses (Chabot Action and Generating Response)
This is a backend process of chatbot where all tasks or operations get executed. The responses are pre-defined and manipulated by Actions. After execution, the response is generated.
Let's build the chatbot model using python. In this, we will learn simple chatbot i.e. intent-response based chatbot. We will use only the intent classifier to create a chatbot. Its chat-flow will be a single-layered.
### Chatbot Data

Let's get training data to chatdata.json in which the intent and its example questions are given. In which greet is intent and hi, hello are questions.

```
{
    "greet": [
        "hi",
        "hello",
        "hey",
        "hola"
    ],
    "goodbye": [
        "bye",
        "goodbye",
        "good bye"
    ]
}

```

The response is predefined in response.json in which the intent and response are given.

```
{
    "greet": "Hello there...!",
    "goodbye": "Bye see you later",
}

```

Add more data for better results.
### Train Bot

Lets read the training and response JSON files.

```
# JSON Encode-Decode library
import json

# Reading chat data
with open("chatdata.json", 'r') as f:
    chat_data = json.load(f)
    f.close()

# Reading Resposne
with open("response.json") as f:
    response_dict = json.load(f)
    f.close()

```

Let us prepare the training data for intent classification. Separating intents (as labels) and questions (as features).

```
# Scientific computational library
import numpy as np

# Training Data
training_dict = {}

# creating formatted data for fitiing model
for intent, question_list in chat_data.items():
    for question in question_list:
        training_dict[question] = intent

# Separating Features i.e questions and Labels i.e intents
feature = np.array(list(training_dict.keys()))
labels = np.array(list(training_dict.values()))
feature, labels
```

  * The features are row text data. To train model let’s apply pre-processing techniques on features.
  * Here, only the TF-IDF Vectorization approach is used.
  * TF-IDF Vectorization includes two processes Count Vectorization and TF-IDF transformation.
  * The Count Vectorization converts a collection of text to a matrix of token counts.
  * TF-IDF transformer gives the token frequencies of occurrence of the token (word) in given corpus i.e list of sentences (or tex).

```
# WordVecotr with TF-IDF
from sklearn.feature_extraction.text import TfidfVectorizer

# Converting text to WordVector
tf_vec = TfidfVectorizer().fit(feature)
X = tf_vec.transform(feature).toarray()

# Reshaping labels to fit data
y = labels.reshape(-1,1)
```

A Random Forest Classifier is used for Intent classification. Random Forest is a meta estimator that fits the number of Decision Trees on various sub-sample of training data and gives the average accuracy and controls the over-fitting.

```
# Classifier
from sklearn.ensemble import RandomForestClassifier

# Fitting model
rnn = RandomForestClassifier(n_estimators=200)
rnn.fit(X, y)

```

> Hurray..!!! we have trained our simple chatbot.
>
> But how to make conversation?
### Lets Chat

To chat with chatbot we need an interface. For testing purposes, a command-line interface is best.

  * The botanswer function is called for conversation.
  * The text goes through the following steps preprocessing(same as training), prediction, response mapping.
  * The probability threshold is applied in botanswer to give accurate answers only.

```
# Creating response
def botanswer(q):
    process_text = tf_vec.transform([q]).toarray()
    prob = rnn.predict_proba(process_text)[0]
    max_ = np.argmax(prob)
    if prob[max_] < 0.6: #Only 60% and above accurate
        return "Sorry I am not getting you...!"
    else:
        return response_dict[rnn.classes_[max_]]

# Chat with bot
while True:
    user = input("User>> ")
    if user == "quit":
        break
    print("Bot>> {}".format(botanswer(user)))
```

### Conclusion

Throughout we have learned how simple chatbot is created using Random Forest. We learned an I ntent-response based chatbot.

For fun, you can add funny conversations and this code to the web applications and create chatbot APIs.
### What Next?

  * Adding Entity classifier for keyword-based operations. Adding a Chat-flow classifier creates a deep chat loop for human-like conversations.
  * For more accurate and large scale data we can use deep learning for modeling I ntent classification.

After reading this article I am sure you learned the basic architecture of chatbot.

I would like your suggestions…..

Thank you!!!
