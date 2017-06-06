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

        schools: Array<School>,
        isLoading: boolean,
        isEmpty: boolean,
        isError: boolean,
    }

    render() {
        const {schools, isLoading, isEmpty, isError} = this.props;

        if (isLoading) {
            return <div>Loading</div>;
        }

        if (isEmpty) {
            return <div>No items match your postal code</div>;
        }

        if (isError) {
            return <div>There was an error processing your search</div>;
        }

        return <ul>{
            schools.map((school) =>
                <li key={school.id}>{school.display}</li>
            )
        }</ul>;
    }
}

const SCHOOLS_QUERY = gql`query allSchools($postalCode: String!) {
  allSchools(
      orderBy: display_ASC,
      filter: {postalCode: $postalCode}
  ) {
    id
    postalCode
    display
  }
}`;

type SchoolsData =  {
    loading: boolean,
    error: string,
    allSchools?: Array<School>,
};

const mapDataToProps = ({data}: {data: SchoolsData}) => {
    const isLoading = data.loading;
    const isEmpty = !!data.allSchools && data.allSchools.length === 0;
    const isError = !!data.error;
    const schools = data.allSchools || [];

    return {isLoading, isEmpty, isError, schools};
};

const mapPropsToOptions = ({postalCode}) => ({variables: {postalCode}});

export default graphql(SCHOOLS_QUERY, {
    options: mapPropsToOptions,
    props: mapDataToProps,
})(Schools);
