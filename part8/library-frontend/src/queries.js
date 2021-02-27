import { gql } from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      _id
      name
      born
      bookCount
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      _id
      title
      author {
        _id
        name
        born
      }
      published
      genres
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(
      genre: $genre
    ) {
      _id
      title
      author {
        _id
        name
        born
      }
      published
      genres
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_NEW_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      _id
      title
      author {
        _id
        name
        born
      }
      published
      genres
    }
  }
`

export const CHANGE_AUTHOR_AGE = gql`
  mutation changeAuthorAge($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      _id
      name
      born
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

// Subscriptions
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      _id
      title
      author {
        _id
        name
        born
      }
      published
      genres
    }
  }
`