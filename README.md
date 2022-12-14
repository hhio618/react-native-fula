# react-native-fula

This package is a bridge to use the Fula protocols in the react-native. It uses WNFS to create the Merkle dag from files and folders and transfer the DAG using Graphsync to the nodes. 

## Installation

```sh
npm install react-native-fula
```

## Usage

```js
import { fula } from 'react-native-fula'; // Until the library becomes stable, we suggest importing from github directly
```

```js
//Initialize the fula client, which creates the libp2p connection. Note that input is not an object e.g. init('','','','noop')
[
    peerId, //returns peerId of the created libp2p instance in form of a string of bytes
    cid, //return the root cid of the WNFS merkle DAG in form of a string
    private_ref //return the keys needed to decode hte encrypted WNFS tree in form of a string of object
] 
= 
await fula.init( 
    identity: string, //bytes of the privateKey of did identity in string format
    storePath: string, // leave empty to use the default temp one
    bloxAddr: string, //leave empty for testing without a backend node
    exchange: 'noop'|'' //add noop for testing without a backend
);
```

```js
//Creates a Folder
const cid //returns the cid of the new root. Note that on every write action the root cid changes.
= 
await fula.mkdir(
    path: string // This is the Fula path to create a folder and always starts with "root/" and should not start or end with a slash e.g "root/pictures"
);
```

```js
//Write a local file on the device to the Fula tree (upload)
const cid //returns the cid of the new root. Note that on every write action the root cid changes.
= 
await fula.writeFile(
    fulaTargetFilename: string, //path to the file on the tree. It should include the filename and extension and start from the "root/". e.g. "root/pictures/cat.jpg"
    localFilename: string //path to the local file. e.g the file that needs to be uploaded
);
//// TODO: This needs to be improved by using stream to not overload the memory for large files
```

```js
//reads a file on fula tree to a local file on the device (download)
const localFilePath //returns the path to the local file and includes the filename
= 
await fula.readFile(
    fulaTargetFilename: string, //path to the file on the tree. It should include the filename and extension and start from the "root/". e.g. "root/pictures/cat.jpg"
    localFilename: string //path to the local file. It should include the filename and extension. e.g. "/temp/cat.jpg"
);
//// TODO: This needs to be improved by using stream to not overload the memory for large files
```

```js
//shows all files and folders under the specified path on Fula
const fileList //returns all the files and folders in a string separated by \n
= 
await fula.ls(
    path: string, //path to the folder on the tree. It always starts from the "root". e.g. "root" or "root/pictures"
);
//// TODO: This needs to be improved by returning an array of files and folders and in chunks to not overload hte memory for large folders
```

```js
//removes all files and folders at the specified path on Fula
const cid //returns the cid of the new root. Note that on every write action the root cid changes.
= 
await fula.rm(
    path: string, //path to the file or folder on the tree. It always starts from the "root". e.g. "root/pictures" or "root/pictures/cat.jpg"
);

```

## Roadmap

Please note the following might not be done in order:

- [x] Initial version with all functions included
- [x] Add WNFS tree encryption key generation from an input (deterministically)
- [ ] Improve ls, read, and write functions to use a stream. ( :100: v1.0.0 Release here )
- [ ] Connect to Blockchain codes using APIs
- [ ] Connect to backend

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
