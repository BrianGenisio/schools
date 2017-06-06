// @flow
import gql from 'graphql-tag';
import {Component} from 'react';
import {graphql} from 'react-apollo';

export type School = {
    id: string,
    postalCode: string,
    display: string,
}

type SchoolQueryChildrenFn = (
    schools: Array<School>,
    details: {
        isLoading: boolean,
        isEmpty: boolean,
        isError: boolean,
    },
) => React$Element<any>;

class SchoolsQuery extends Component {
    props: {
        postalCode: string,
        children?: SchoolQueryChildrenFn,

        isLoading: boolean,
        isEmpty: boolean,
        isError: boolean,
        schools: Array<School>,
    }

    static defaultProps = {
        isLoading: false,
        isEmpty: false,
        isError: false,
        schools: [],
    }

    render() {
        const {isLoading, isEmpty, isError, schools, children} = this.props;

        return children && children(schools, {isLoading, isEmpty, isError});
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
})(SchoolsQuery);
