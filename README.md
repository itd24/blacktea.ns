# blacktea.ns
## A small plugin for managing namespaces

This plugin provides a relatively simple way of managing namespaces within your javascript modules.
It converts **require** statements like this:
<br/>
`require('../../core/modules/someModule/libraries/someLibrary')`
<br/>
<br/>
into this:
<br/>
`ns.require('modules.someModule.libraries.someLibrary')`
<br/>
<br/>
or, if you really want, into this:
<br/>
`ns.require('someModuleLibraries.someLibrary')`
<br/>
<br/>
It is up to the developer, how to define the namespaces.
This plugin was created, because I hated the long paths I had to use in my required statements and I didn't bother to check, 
if something simmilar already exists.

## Overview

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation

install it via the npm command: `npm install blacktea.ns --save` and require the plugin in your modules: `var Ns = require('blacktea.ns')`. No Bower yet, sorry.

## Usage

You create a namespace object, set a root, optionally add a few more namespaces and require whatewer you need:
```
var Ns = require('blacktea.ns');
Ns.root('..') //we set the root to the parent, this is just an example, set it to whatewer you like

Ns.addPath('modules','directory/subdirectory/modules'); //we add another namespace

Ns.require('directory.library1'); // translates to require('../directory/library1')
Ns.modules.require('module.libraries.namespace..library2'); //translates to require('directory/subdirectory/modules/module/libraries/namespace.library2')
```
As you may have guessed by now, you escape a dot with a double dot.

## Release History

* 0.1.0 Initial release

## Licence

Blacktea.ns is released under the [MIT License](http://www.opensource.org/licenses/MIT).