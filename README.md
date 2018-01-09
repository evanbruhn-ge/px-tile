# px-tile

## Overview

Px-tile displays an image, a title, and a description - perfect for image galleries.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-tile --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-tile/px-tile.html"/>
```

Finally, use the component in your application:

```
<px-tile
  title="title text"
  subtitle="subtitle text"
  description="description text"
  overlay-description="overlay description text"
  action-buttons='{"items":[{"id":"103","size":"small","type":"bare","buttonIcon":true,"icon":"px-nav:reload","isPrimary":true},{"id":"1","label":"Return","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:link"},{"id":"2","label":"Scrap","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:copy"},{"id":"3","label":"Download","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:download"}]}' 
  hoverable >
  <div slot="footer">Footer Content Here</div>
</px-tile>
```

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-tile).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

1. Interactive demo - http://localhost:8080/
2. Simple demo - http://localhost:8080/demo/simple_demo.html
3. Various usages demo - http://localhost:8080/demo/components-mix-demo.html

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-tile/issues) to submit any bugs you might find.
