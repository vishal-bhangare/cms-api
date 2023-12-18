
## API Reference

## Users Endpoints
### User Signup

*   **URL**: `/users/signup`
*   **Method**: `POST`
*   **Description**: Creates a new user.
*   **Authentication**: None
*   **Request Body**:
    *   `newUserDto` (Type: `NewUserDto`): User data for signup, including confirmation of the password.

### User Login

*   **URL**: `/users/login`
*   **Method**: `POST`
*   **Description**: Authenticates a user and returns a JWT token.
*   **Authentication**: None
*   **Request Body**:
    *   `loginData` (Type: `UserLoginDto`): User login credentials

### Delete User

*   **URL**: `/users`
*   **Method**: `DELETE`
*   **Description**: Deletes a user.
*   **Authentication**: Requires authentication using the `AuthGuard`.
*   **Request Body**:
    *   `deleteUserDto` (Type: `deleteUserDto`): User data for deletion, including the user's email.

## Contact Endpoints

### Get All Contacts

*   **URL**: `/contacts/:userid`
*   **Method**: `GET`
*   **Description**: Retrieves all contacts for a specified user.
*   **Authentication**: Requires authentication using the `AuthGuard`.
*   **Request Parameter**:
    *   `userid` (Type: `number`, Location: URL): User ID for whom to retrieve contacts.

### Create Contact

*   **URL**: `/contacts`
*   **Method**: `POST`
*   **Description**: Creates a new contact.
*   **Authentication**: Requires authentication using the `AuthGuard`.
*   **Request Body**:
    *   `contactData` (Type: `NewContactDto`): Data for creating a new contact.

### Update Contact

*   **URL**: `/contacts/:id`
*   **Method**: `PATCH`
*   **Description**: Updates an existing contact.
*   **Authentication**: Requires authentication using the `AuthGuard`.
*   **Request Parameters**:
    *   `id` (Type: `number`, Location: URL): ID of the contact to be updated.
*   **Request Body**:
    *   `contactData` (Type: `UpdateContactDto`): Data for updating an existing contact.

### Delete Contact

*   **URL**: `/contacts/:id`
*   **Method**: `DELETE`
*   **Description**: Deletes a contact.
*   **Authentication**: Requires authentication using the `AuthGuard`.
*   **Request Parameter**:
    *   `id` (Type: `number`, Location: URL): ID of the contact to be deleted.
