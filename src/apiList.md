authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  edit

connectionRequestRouter
- POST /reguest/send/intrested/:userId
- POST /reguest/send/ignored/:userId
- POST /reguest/send/accepted/:userId
- POST /reguest/send/rejected/:userId

userRouter
- GET /user/connections
- GET /user/received
- GET /user/feed - Gets your profile and other users on platform

Status - ignore , interested, accepted , rejected