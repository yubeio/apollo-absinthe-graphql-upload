
# apollo-absinthe-graphql-upload

Enables file uploads in [Apollo](http://apollodata.com) via GraphQL mutations for servers with graphql layer powered by [Absinthe](http://absinthe-graphql.org/).
Use with [absinthe_plug](https://github.com/absinthe-graphql/absinthe_plug).

## Setup

Install with [npm](https://npmjs.com):

```
npm install apollo-absinthe-graphql-upload
```

Setup Apollo Client with this network interface:

```js
import ApolloClient from 'apollo-client'
import { createNetworkInterface } from 'apollo-absinthe-graphql-upload'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'my.endpoint/graphql'
  })
})
```

## Usage

Once setup, you will be able to use [`File`](https://developer.mozilla.org/en/docs/Web/API/File) instances anywhere within mutation or query input variables for your client interaction with Absinthe GraphQL servers.

`Note`: This is in a Work in Progress status. We're new to GraphQL world.
This lib was not tested, and most likely not to work with [`FileList`](https://developer.mozilla.org/en/docs/Web/API/FileList). Feel free to help.

## References

- [@jaydenseric](https://github.com/jaydenseric)’s [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client).
- [@danielbuechele](https://github.com/danielbuechele)’s [Medium article](https://medium.com/@danielbuechele/file-uploads-with-graphql-and-apollo-5502bbf3941e).