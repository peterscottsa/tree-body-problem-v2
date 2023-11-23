## Tree search input 🌲🔍

### Quick start 🏃

To run this project locally, clone the repository and run:

```bash
npm install
npm start
```

You can also run the tests with:

```bash
// Ensure the project is running with `npm run start` before you run the tests
npm test
```

### Overview 🔭

Notable features
- Tests are written in Playwright. I chose playwright because end to end testing generally has more value as it tests what the user actually sees. In my experience most serious issues are caught by end to end tests rather than unit tests. 
- I used tailwind to do some basic styling. 
- I used react-arborist to render the tree.
- Typescript is used throughout the project.

Due to my limited time I decided to use an off the shelf solution for the tree component. I chose [react-arborist](https://github.com/brimdata/react-arborist) mainly because its well documented and solves many different uses-cases including those in the challenge. It also has been actively maintained which can be a concern when using open source solutions.  
In the real world, its unlikely I would build a component like this from scratch as I think using battle hardened solutions is usually better than reinventing the wheel.

If I were to build this component from scratch I would probably use a depth first search algorithm to traverse the tree. In fact this is exactly the strategy employed by the react-arborist which you can see in the [source code](https://github.com/brimdata/react-arborist/blob/main/packages/react-arborist/src/utils.ts#L36-L46).

### What I would do with more time 🕰
- Add some accessiblity features to the tree component. Likely keyboard support and aria attributes to help screen readers. 
- Add some more tests. Mainly around some edge cases like what happens when the tree is empty or when the search term is not found.
- Do some validation of the data structure to avoid id collisions and circular references.
- Custom checkboxes. 
- A demonstration of filtering kitchens based on locations selected







