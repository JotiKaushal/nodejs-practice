#devtinder frontend


-created vite +react application
-remove unecessary code & create hello world code 
-install tailwind css
-install daisyui (component library)
-Add navbar component to app.js
-install react-router
create browser route >> routes >> route >> /body >> route children
-create child route of body
-add outlet in body component
-create footer
-create login page
-install login
-CORS- install cors in backend => add middle ware to app with configuration origin and credentials: true
-in front when ever making api call pass axios => {withCredentials: true}
install REdux toolkit - https://redux-toolkit.js.org/tutorials/quick-start   
- react-redux + @reactjs/toolkit => configureStore => Provider => createSlice => add reducer to store
-add reducxtoolkit to browser
- login and check data instore
-Navbar should update after login
-refactor code to add consdtant file + create component folder
-should not be able to access other routesd if not login
-redirect user to login page
-logout
-profile page
-create logout feature
-get the feed
-add the feed in store
-create userCard component
-dedit profile\-show toast mesage on suces
- se al conection page
-new page to see all connection requests
-send/ignore cnnectionr equest
-sign up new user
-e2e testing



#deployment
-signup on AWS
-lauch instanch (ec2)
-create key value pair
- chmod 400 <secret>.pem (open git bash go to download folder where perm file is then run this command)
-connect >> using ssh (run ssh cmd  ssh -i "devTinder-secret.pem" ubuntu@ec2-13-232-217-252.ap-south-1.compute.amazonaws.com)
-install node on aws instance (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
-git clone(clone your git repository to aws instance)


-deploy front end project 
-go to project folder
-do npm i
-run >> npm run build
-sudo apt update
-sudo apt install nginx
-sudo systemctl start nginx
-sudo systemctl enable nginx
-copy code from dist (build filess) to /var/www/html/
-sudo scp -r dist/* /var/www/html/
-enable port of your aws instance
-go to aws instance in UI >>  security >> security group >> inbound rule >> add port 80
-then check open ip in browser (http://13.232.217.252/). Remeber to remove s from https if it is there

Body
-Navbar
route / =feed
route /login => login page




