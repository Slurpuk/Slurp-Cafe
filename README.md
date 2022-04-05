
## Project Name: Jumping Potatoes

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

#### Current unsolved issues:

- With the current implementation using firestore, tracking the conection state of logged-in user is impossible. As a workaround, we set a timeout on critical queries that would return a connection alert after expiring.

