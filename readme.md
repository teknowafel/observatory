# Observatory
## Keep tabs on your servers

![Observatory](https://github.com/teknowafel/observatory/raw/master/img/observatory.png)  

Observatory is a simple, modular way to view vital information about your machines. It's not just a dashboard but rather a window into what's going on. The netstat mdule allows you to keep an eye out for bad actors, and the S.M.A.R.T module can alert you to failing disks. All of this is FOSS under a GNU GPL license for you and others to improve.

## Methodology
The backend is a simple express webserver with microservices for each endpoint so that you can add what you need and remove what you don't. The backend runs commands like netstat and smartctl to get information, so that you don't have to.

The frontend is written in vanilla JavaScript and utilizes the TailwindCSS framework for a responsive, mobile-friendly layout that's easy on the eyes.

## Configuration
config.js in the backend folder should look familiar to anyone who's used JS or JSON. Currently, there is only one key-value pair, but it is planned to add more in the future as functionality is added.
```js
// backend/config.js

module.exports = {
    // piholeUrl: "http://10.0.0.1" // URL to the Pi-Hole web interface which is used for API access
    piholeUrl: "http://192.168.1.67",
};
```
## Usage
Just run `npm start` as root, and the webserver will be accessible on port 8080. The express backend and static frontend are also separate, so modifying the code to keep the two on different containers or machines would be simple. The frontend will have an option to choose from different backends soon.

![Modules](https://github.com/teknowafel/observatory/raw/master/img/modules.png)  
Modules can be enabled or disabled on the user end using this modal, and preferences are stored in LocalStorage. Choose to show/hide what you need/don't need respectively.

## Docker
Dockerfile and CD builds will be coming in v1.2

## Security
In case you're worried about someone seeing your server's CPU usage, reverse proxies like NGINX support authentication before redirecting the user to the site. I'm not going into detail here, but it should be pretty straightforward.