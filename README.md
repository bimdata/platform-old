# BIMData Platform

BIMData Platform is a web application to manage your project in the BIM ecosystem. You can manage your projects and your files in relation to your users.
Projects are organized into Clouds. BIMData Platform manages models with open formats such as IFC and BCF.

![Screenshot BIMData Platform](screenshot-platform.svg "Screenshot BIMData Platform")


## Technical view of the Platform

️️BIMData Platform is a web application. It's a frontend to the BIMData's API, built with Javascript using Vue.


## Install

### Clone this repository

```
git clone https://github.com/bimdata/platform.git
```
and place yourself in the ``platform/`` directory. 
Then by CLI, using NPM packager, install dependencies and launch the Platform on your local server.

## Configure your Platform

Type the following commands to:

#### Install dependencies
```
npm i
``` 

(It's a shortcut for ``npm install``.)

#### Configure environment

```
cp .env.example .env
```
#### Change in .env any custom configuration

Edit your ``.env`` file in a text editor, and change:
* `BD_OIDC_CLIENT_ID` value by the Client ID of your application ([How-to create your application with BIMData Connect](https://developers.bimdata.io/cookbook/create_an_application.html))
* `BD_MAPBOX_TOKEN` value by your own Mapbox Token ([How-to create a Temporary token for Mapbox](https://docs.mapbox.com/help/tutorials/get-started-tokens-api/#creating-temporary-tokens))


#### Start your dev server

While being still in the ``platform/`` directory, type the following command:
```
npm run dev
```
And the local server is up & running!

## Additional tasks

### Compile SVG icons

Added an new icon?
Re-generate the SVG by running the following command:

```
npm run svg-process
```
### Running tests 

Run the unit tests by running the following commands:

```
npm run unit
```
All tests:
```
npm run test
```

## Running and deploy

### Building for production

```
npm run build
```