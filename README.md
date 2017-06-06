# Demo for creating Query/Mutation components via Apollo and GraphQL
This is a simple demo which shows how to create a good separation of concerns between presentation components and query components when using Apollo and GraphQL.  This demo is intended to accompany a blog post wich is currently TBD.

You can [play around with it](http://briangenisio.com/schools/) and enter a few zip codes.  The database only really has a few right now (48103, 48104, 48105), but you'll get the idea.

For the GraphQL backend, I'm using [Graph.Cool](http://graph.cool).  It is a REALLY easy way to start experimenting with GraphQL on the front-end without having to learn how to implement a GraphQL server.

## What is a Query Component?
A query component is React component which handls all of the query work for you.  It provides a nice separation between your query logic and your presentation component while maintaining a reasonable amount of co-location.  The [src/SchoolsQuery.js](https://github.com/BrianGenisio/schools/blob/master/src/SchoolsQuery.js) file is an example of this technique and it is easy to compose queries with presentation.

```js
<SchoolsQuery postalCode={postalCode}>
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
</SchoolsQuery>
```

Note that this technique uses the ["Functions as Children"](https://facebook.github.io/react/docs/jsx-in-depth.html#functions-as-children) approach so that the query component can pass data and properties down to the child via a function.

## Mutation Components
The same technique can be used for mutations.  I don't have it in the demo because I don't want to allow anyone to add to the database, but you can see how it works in [src/NewSchoolMutation.js](https://github.com/BrianGenisio/schools/blob/master/src/NewSchoolMutation.js).  Composing with presentation is very similar:

```js
<NewSchoolMutation
    postalCode={postalCode}
    display={display}
>
    {onNewSchool => <button
      onClick={onNewSchool}
    >
        Create!    
    </button>}
</NewSchoolMutation>
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  I've added a few extra things to it, like [Flow](https://flow.org/) and [Flow to PropTypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes).

## Running the demo app

Clone the repo, then
### `npm install`
### `npm start`
