// @flow

import React, {Component} from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Schools extends Component {
    render() {
        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        return <ul>
        {this.props.data.allSchools.map((school) =>
            <li key={school.id}>{school.display}</li>
        )}
        </ul>;
    }
}

const SCHOOLS_QUERY = gql`query allSchools {
  allSchools(orderBy: display_ASC) {
    id
    postalCode
    display
  }
}`;

export default graphql(SCHOOLS_QUERY)(Schools);