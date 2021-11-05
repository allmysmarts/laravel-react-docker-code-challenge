# How to launch and configure docker environment?

1. Install Docker and run `docker-compose up` on root directory - It will create docker images and containers.
2. You need to set virtual hosts - /etc/hosts

    127.0.0.2 myapp.com

    127.0.0.2 api.myapp.com
    
3. Once everything is setup, you can visit http://myapp.com
4. Go to sign up page and you can create user with your name and email address.
5. Once you successfully sign up, you can log in and test.