## Tree search input

### Quick start

To run this project locally, clone the repository and run:

```bash
npm install
npm start
```

You can also run the tests with:

```bash
npm test
```


### Description

This is a simple example of a tree search input. It is a component that allows you to search through a tree structure and select a node. The tree structure is defined by a list of objects, each of which has a `name` and `children` property. The `children` property is a list of objects with the same structure. The tree search input is a controlled component, so you need to pass in the `value` and `onChange` props.


### Overview

Due to my limited time I decided to use an off the shelf solution for the tree component. I chose [react-arborist](https://github.com/brimdata/react-arborist) because it is well documented and has a good API. While I could probably engineer a solution that is more performant, I felt this was a good tradeoff for the time I had available. Another benefit of not reinventing the wheel is that the component is well tested and flexible.  




