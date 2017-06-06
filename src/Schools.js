// @flow

import React, {Component} from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type School = {
    id: string,
    postalCode: string,
    display: string,
}

class Schools extends Component {
    props: {
        postalCode: string,
        data: {
            loading: boolean,
            allSchools?: Array<School>,
        }
    }

    render() {
        const {data} = this.props;
        const {loading, allSchools = []} = data;

        if (loading) {
            return (<div>Loading</div>)
        }

        return <ul>{
            allSchools.map((school) =>
                <li key={school.id}>{school.display}</li>
            )
        }</ul>;
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