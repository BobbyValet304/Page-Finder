import { gql } from "@apollo/client";
const QUERY_ME = gql`
  query Query {
    me {
      _id
      email
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;

export { QUERY_ME };
