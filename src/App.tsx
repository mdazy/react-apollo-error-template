import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

type Person = {
  id: string;
  name: string;
}

type Response = {
  people: Person[];
}

const PEOPLE_QUERY = gql`
  query ErrorTemplate {
    people {
      id
      name
    }
  }
`;

const withPeople = graphql<{}, Response>( 
  PEOPLE_QUERY, {}
);

// Type 'DataValue<Response, {}> | undefined' has no property 'loading' and no string index signature.
// Type 'DataValue<Response, {}> | undefined' has no property 'people' and no string index signature.
// Type 'DataValue<Response, {}> | undefined' has no property 'error' and no string index signature.
export default withPeople( ( { data: { loading, people, error } } ) => {
  if( loading ) {
    return <p>Loading...</p>;
  }
  if( error ) {
    return <h1>Error!</h1>;
  }
  return <ul>
    {people.map( p => <li>{p.id} - {p.name}</li>)}
  </ul>;
} );
