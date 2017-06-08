import React, {Component} from "react";

import NewSchoolMutation from "./NewSchoolMutation.js";

class CreateSchool extends Component {
    state = {
        postalCode: "",
        display: "",
    }

    render() {
        const {postalCode, display} = this.state;

        return <div>
            <input
                placeholder="Postal name"
                value={postalCode}
                onChange={e => this.setState({postalCode: e.target.value})}
            />

            <input
                placeholder="School name"
                value={display}
                onChange={e => this.setState({display: e.target.value})}
            />

            <NewSchoolMutation
                postalCode={postalCode}
                display={display}
            >
                {triggerMutation => <button onClick={triggerMutation}>
                    Create!
                </button>}
            </NewSchoolMutation>
        </div>;
    }
}

export default CreateSchool;
