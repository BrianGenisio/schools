// @flow
import gql from 'graphql-tag';
import {Component} from 'react';
import {graphql} from 'react-apollo';

import type {School} from "./SchoolsQuery.js";

type MutationCallback = (postalCode: string, display: string) => Promise<School>;

class NewSchoolsMutation extends Component {
    props: {
        postalCode: string,
        display: string,
        children?: (createSchool: () => Promise<School>) => React$Element<any>,
        onCreateSchool: MutationCallback,
    }

    handleExecuteMutation = () => {
        const {postalCode, display, onCreateSchool} = this.props;
        return onCreateSchool(postalCode, display);
    }

    render() {
        const {children} = this.props;

        return children && children(this.handleExecuteMutation);
    }
}

const SCHOOLS_MUTATION = gql`
mutation createSchool(
    $postalCode: String!,
    $display: String!
) {
  createSchool(postalCode:$postalCode, display:$display) {
    id
    postalCode
    display
  }
}`;

type MutationResult = {
    errors: string[],
    data?: {
        createSchool: School,
    },
};

const mutationResultToSchool = () =>
    (result: MutationResult) => {
        if (result.errors || !result.data) {
            throw new Error("Failed to mutate");
        }

        return result.data.createSchool;
    };

const mapMutationToProps = ({mutate}) => ({
    onCreateSchool: (postalCode: string, display: string) => mutate({
        variables: {postalCode, display},
    }).then(mutationResultToSchool()),
});

export default graphql(SCHOOLS_MUTATION, {
    props: mapMutationToProps,
})(NewSchoolsMutation);
