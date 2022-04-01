export const AlertMessage = {
  DATABASE: {
    title: "Can't connect to the database",
    message: "That's embarrassing - something went completely wrong...",
  },
  WEAK_PASSWORD: {
    title: 'Weak password',
    message: 'Please enter a more robust password',
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
  EMAIL_IN_USE: {
    title: 'Email in use',
    message: 'Please use a different email to sign up.',
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
  REJECTING_ORDER: {
    title: 'Rejecting',
    message:
      'You are about to reject this order. This may be impact your rating. Are you sure?',
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
