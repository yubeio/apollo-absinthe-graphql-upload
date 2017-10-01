import { HTTPFetchNetworkInterface, printAST } from 'apollo-client';
import RecursiveIterator from 'recursive-iterator';
import _ from 'lodash';

// Get all files at any level from the request object
// and alter the file itself by its path in the request
const fetchAndPatchFiles = (request) => {
  const files = [];
  const iterator = new RecursiveIterator(request);
  for(let { node, path } of iterator) {
    if(node instanceof File) {
      const filePath = path.join('.');
      _.set(request, path, filePath);
      files.push({ filePath: filePath, file: node });
    }
  }

  return files;
};

export class ApolloAbsintheGraphQLUploadNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {
    // If browser supports uploads
    if (typeof FormData !== 'undefined') {
      const files = fetchAndPatchFiles(request);

      if (files.length > 0) {
        let formData = new FormData();
        formData.append('query', printAST(request.query));
        formData.append('variables', JSON.stringify(request.variables || {}));
        formData.append('operationName', request.operationName);
        files.forEach( ({ filePath, file }) => {
          formData.append(filePath, file);
        });

        return fetch(this._uri, {
          method: 'POST',
          body: formData,
          ...options
        });
      }
    }

    // Delegate requests with no file uploads to Apollo
    return super.fetchFromRemoteEndpoint({ request, options });
  }
}

export function createNetworkInterface({ uri, opts = {} }) {
  return new ApolloAbsintheGraphQLUploadNetworkInterface(uri, opts);
}
