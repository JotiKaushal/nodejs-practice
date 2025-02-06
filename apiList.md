authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password


connectionRequestRouter
-POST /request/send/ignore/:userid
-POST /request/send/interested/:userid
-POST /request/review/acccepted/:requestId
-POST /request/review/rejected/:requestId

--GET: /user/connections
-GET: /user/request/received
-GET: /user/feed <-- get profile of other users



status: ignore, interested, acccepted, rejected