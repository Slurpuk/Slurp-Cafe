export const AlertMessage = {
  DATABASE: {
    title: "Can't connect to the database",
    message: "That's embarrassing - something went completely wrong...",
  },
  WEAK_PASSWORD: {
    title: 'Weak password',
    message: 'Please enter a more robust password',
  },
  EMPTY_EMAIL: {
    title: 'Empty Email',
    message: 'Please enter your email.',
  },
  EMPTY_PASSWORD: {
    title: 'Empty Password',
    message: 'Please enter your password.',
  },
  EMPTY_PASSWORD_CONFIRMATION: {
    title: 'Empty Password Confirmation',
    message: 'Please enter the password confirmation.',
  },
  PASSWORDS_DONT_MATCH_UP: {
    title: 'Passwords dont match up',
    message:
      'Please make sure you password confirmation is the same as you password.',
  },
  SUCCESSFUL_REGISTRATION: {
    title: 'Congratulations',
    message: 'Registered Successfully',
  },
  EMPTY_SHOP_NAME: {
    title: 'Empty Shop Name',
    message: 'Please enter your shop name.',
  },
  DESCRIPTION_LENGTH: {
    title: 'Description length',
    message: 'The shop description must be between 20 and 100 characters long.',
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
  LOGOUT: {
    title: 'Logout',
    message: 'You are about to logout, are you sure?',
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
