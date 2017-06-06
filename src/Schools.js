// @flow

import React, {Component} from "react";

import SchoolsQuery from "./SchoolsQuery.js";

class Schools extends Component {
    props: {
        postalCode: string,
    }

    render() {
        const {postalCode} = this.props;

        return <SchoolsQuery postalCode={postalCode}>
            {(schools, {isLoading, isEmpty, isError}) => {
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
            }}
        </SchoolsQuery>;
        
        
         
    }
}

export default Schools;
