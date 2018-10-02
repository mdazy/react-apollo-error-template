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
