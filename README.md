# project
<strong>Steps for creating a new application with ax-frmk:</strong>
<br>  - Clone this repo: https://github.com/bogdanim36/project.
<br>  - Run npm install in project folder.
<br>  - Check in gulpfile.config.json if paths are that what you want, and change it if you need.
<br>  - Run npm create script with  "npm run create". This command  will clone  https://github.com/bogdanim36/ax-frmk and will create a new project folder structure.
<br>  - Delete what plugins you dont need in app-modules/bower-libs, and add you want to use.
<br>  - Add to .gitignore your own folders for modules from app-modules 
<br>  - In app-modules/angular-modules.js include what angular modules you are using (if you are using some extra plugin, whitch are installed in app-modules/bower-libs
<br>  - In app-modules/config-auth.js setup your auth
<br>  - In app-modules/config-ax-api.js setup your api
<br>  - In app-modules/config-ax-components.js setup ax-component params.
<br>  - In app-modules/config-modules.js config your application name, version, and other parameters.
<br>  - Add dependencies for yours added plugins in app/modules/gul-config.json. 
<br>  - Check gulpfile.config.json and gulpfile.sftp.json and config as you need. If you are not agreed with thise project structure files, you can changed, but you must change also in gulpfile.config.json all the path changed.
<br>  - Create your database, user, password, tables.
<br>  - Create your api, if not using php-api. If using php-api, use config.*.php files to setup php-api.
<br>  - Create you template and pages for your application.
<br>  - Run Es6-Dev-Copy gulp task to move files to folder "public/es6" for web server.
<br>  - Start Es6-Dev-watch gulp task. From this point keep it open while developing. The deploying gulp task Publish-All can work in same time, whithout problems.
<br>  - Config your site server (pointed to 'public/es6' folder). I prefer IIS for php backend on windows (form better performance)).
<br>  All theses steps can take maximum 10-30min, and you can start to work on application pages and views.