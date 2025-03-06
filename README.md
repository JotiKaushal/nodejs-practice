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


-backend
-allow ec2 instance public ip on mongo db
installed pm2 on server(to keep app running on server)  npm install pm2 -g (in git bash server terminal)
-pm2 start npm -- start  (to start server in background)
--pm2 logs (to see app logs)
-- pm2 flush (to remove logs)
--pm2 stop npm (name of process running check using pm2 list)
--pm2 delete npm (to delete process)

to rename process
pm2 start npm --name "devtinder-backend" -- start (in git bash server terminal)


front end: http://3.7.66.180/
back end: http://3.7.66.180:3000/feed map it to http://3.7.66.180/api/feed

edit nginx config for this on sewrver: command with path >sudo nano /etc/nginx/sites-available/default (in git bash server terminal)

nginx config:

location /api/ {
        proxy_pass http://localhost:3000/;  # Pass requests to Node.js
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }


-restart nginx: cmd >> sudo systemctl restart nginx (in git bash server terminal)
-update base url in front end application and commit changes
- git pull on server (in git bash server terminal)
un >> npm run build (in git bash server terminal)
-copy code from dist (build filess) to /var/www/html/
-sudo scp -r dist/* /var/www/html/ (in git bash server terminal)



Domain name mapping
--- purchase custom domain from go daddy for one year
--- create account on cloud flare & add a new domain name ()
--- change name server on go daddy poiunt it to clouyd flare ( after activation pf custon domain on cloud flare cpoy paste nae server from cloud flare to go daddy)
--- it will take some time to activated
-- in dns record cloud flare >> update public ip from amazon for type A (delete the extra A)
-- Enable ssl: go to ssl/tls from side menu : configure >>custom ssl/tsl >> select flexible
    go to edge certificates >> enable automaticallly https rewrite
    

info:

domain registrar : go daddy (from where we buy domain)
dns record management: clound flare (ssl management)

HOme work: how to enable full ssl/tls: to full we need to download keys and put them on server and do some nginx config changes

purchase domain name from godaddy
signup to cloudflare and add new domain name
change nameserver on godaddy and point it to cloud flare
wait for sometime till your server are updated ~15 mins
Dns record: update type A of devloper.in to 13.235.49.192 (there should be only one a record, you can delete any one of the existing an update the other one)
enable SSL >> go to SSl/tls on cloud flare side menu >> select flexible and save
from cloud flare >> edge certificates >> allow https redirection



---Enable email sending

login to amazon ses
go to iam first and creat ses user, give access to Amazonses full access
create and identity in amazon ses
verify your domain name or verify email address (we did domain veridy in project)

install sdk & make sure version is v3
code example: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
setup sesClient
-access credential should be created on IAM >> ses-user >> security credential tab
-add credentials to env file
-write code for sesClient
-write code to send email
-make email dynamic by passign more parameters