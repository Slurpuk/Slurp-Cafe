export const AlertMessage = {
  DATABASE: {
    title: "Can't connect to the database",
    message: "That's embarrassing - something went completely wrong...",
  },
  CONNECTION: {
    title: 'No connection',
    message:
        "It seems like you're not connected to the internet. Please check your service",
  },
  MANY_REQUESTS: {
    title: 'Too many requests',
    message:
        "It looks like you've tried that too many times, you will be able to try again later.",
  },
  WRONG_CREDENTIALS: {
    title: 'Wrong Password',
    message: "You can reset your password if you can't remember.",
  },
  BAD_EMAIL: {
    title: 'Bad Email',
    message: "That doesn't look like a valid email.",
  },
  WRONG_PASSWORD: {
    title: 'Wrong Password',
    message: "You can reset your password if you can't remember.",
  },
  RESET_PASSWORD: {
    title: 'Reset Sent',
    message:
        'If an account exists with that email, you will receive a link to rest you password.',
  },
  ELSE: {
    title: 'Rare Error!',
    message:
        "This is a funky error! We don't really know what went wrong, but something went wrong.",
  },
  CODE_0001: {
    title: 'Registration Error',
    message: 'This is our bad, contact technical support. Error code #0001',
  },
};

/*
CUSTOM ERROR CODES:
#0001: Users have a database model associated with their auth model.
The user model has to be verified to exist before going ahead with authentication
(regardless of whether there is an authentication model or not).
This error code is caused by finding a database model (in users, the 'Users model')
but no auth model. This mean there has been a fault in the creation of the user.
This error should never happen.
 */
