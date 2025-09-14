authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  edit

connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

userRouter
- GET /user/requests/received
- GET /user/received
- GET /user/feed - Gets your profile and other users on platform

Status - ignore , interested, accepted , rejected