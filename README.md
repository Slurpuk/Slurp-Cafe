
# Software Name: Slurp Café

### Members: 
- Ardan Kavuklu
- Jad Sbaï
- Liam Clark Gutiérrez
- Meyad Golmakani
- Sara Latif
- Sean Stanfield
- Sonia Koszut
- Pascual Merita Torres
- Vicente Sebastião

### Significant source code dependencies:

    ReactNative Firebase: https://rnfirebase.io/

### Deployment: Will be deployed to Appetizer by the 15th of April.

### Shops:

All passwords are "Password123!", the following users are seeded with orders. All coffee shops are seeded with orders and items.

### Default users

- eten@gmail.com
- cafecombi@gmail.com
- arcadecafe@gmail.com


## Development guidelines

### Recommendations:
- Use webstorm as an IDE.
- Set up auto save on your IDE.
- [Set ESlint to run on file save](https://www.jetbrains.com/help/idea/eslint.html#ws_eslint_configure_run_eslint_on_save).

### Rules
- Code on a separate branch appropriately named.
- Commit rules:
  - Name your commits [properly](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/).
  - Separate your commits into logical chunks of code.
- Pull request rules:
  - Don't leave print statements
  - Don't leave commented code unless it is highly likely to serve a future purpose.
  - Check your ESlint warnings, they are (usually) there for a reason.
  - Describe what you have done in detail proportional to the complexity of the task.
  - Review your own code as if you were reviewing someone else's request.
  - Test your code locally and then make sure it passes CI/CD workflows
- Update the Kanban board when you start/finish/approve a task.

## Testing

  ```npm run test```


#### Current unsolved issues:

- With the current implementation using firestore, tracking the conection state of logged-in user is impossible. As a workaround, we set a timeout on critical queries that would return a connection alert after expiring.

