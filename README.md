# Description

The simpliest module for tranform TeX-string into SVG-string via MathJax library.

# Install

- install somehow `MathJax` package (i.e. `npm i --save mathjax`)
- copy `tex-to-svg` to your codebase
- import `import { setMathjaxRoot, renderMath } from './text-to-svg`;
- set up mathjax's files directory `setMathjaxRoot('/mathjax/')`
- use it `renderMath('a+b').then(svg => console.log(svg))`
