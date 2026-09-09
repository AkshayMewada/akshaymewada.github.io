---
title: An Introduction to Text Search
eyebrow: Notes · Search
permalink: /notes/text-searches/introduction/
description: Notes on finding words, phrases, and relevant documents in text.
---

Text search helps us find words, phrases, or relevant documents in a collection of text. The right approach depends on whether we need an exact match, a forgiving match, or a match based on meaning.

## Exact matching

Start with the simplest question: does this text contain the query?

```javascript
const text = "An introduction to machine learning";
const query = "machine learning";

text.toLowerCase().includes(query.toLowerCase()); // true
```

This works well for small lists and phrase searches. It matches substrings, so searching for `cat` also matches `category`. Whole-word matching needs an additional rule for word boundaries.

## Keyword search

Keyword search breaks text into searchable terms. An **inverted index** maps each term to the documents that contain it, avoiding a scan of every document for each query.

For a query such as `machine learning`, a search can require both terms or accept either one. Ranking then determines which matching documents appear first.

## Fuzzy matching

Fuzzy matching allows small differences between the query and the text. For example, `machien` could still find `machine`.

It is useful for typos, but allowing too much variation can return unrelated results.

## Semantic search

Semantic search looks for related meaning. A query like `how to teach a computer from examples` might find a document about machine learning even when the exact query words are absent.

A common approach represents queries and documents as numerical vectors called **embeddings**, then compares their similarity.

## Choosing an approach

| Need | Starting point |
| --- | --- |
| Find a phrase in a small amount of text | Substring matching |
| Search many documents by their words | Keyword search with an inverted index |
| Handle spelling mistakes | Fuzzy matching |
| Find related ideas expressed differently | Semantic search |

These approaches can also be combined. A useful first step is to collect example queries and check whether the results match what a reader expects.
