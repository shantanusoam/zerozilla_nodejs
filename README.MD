# REST API for Agency and Client Management

This repository contains a REST API for managing agency and client information. The API provides endpoints to create an agency and client in a single request, update client details, and retrieve agencies with their top clients. Token-based authentication using JWT (JSON Web Tokens) is implemented to secure the endpoints, and MongoDB is integrated to store and retrieve agency and client data.

## API Endpoints

### 1. Create an Agency and Client in a Single Request

**Endpoint:** `POST /api/agency-client`

**Request Body:**
```json
{
    "agency": {
        "name": "Agency Name",
        "address1": "Address 1",
        "state": "State",
        "city": "City",
        "phoneNumber": "1234567890"
    },
    "client": {
        "name": "Client Name",
        "email": "client@example.com",
        "phoneNumber": "9876543210",
        "totalBill": 1000
    }
}

**Response:** Status 201 Created

### 2. Update Client Details

**Endpoint:** PUT `/api/client/{clientId}`

**Request Body:**
```json
{
    "name": "Updated Client Name",
    "email": "updatedclient@example.com",
    "phoneNumber": "9998887776",
    "totalBill": 1500
}
```

**Response:** Status 200 OK

### 3. Retrieve Agency with Top Client(s)

**Endpoint:** GET `/api/top-clients`

**Response:**
```json
[
    {
        "agencyName": "Agency Name",
        "clientName": "Client Name",
        "totalBill": 1500
    },
    {
        "agencyName": "Another Agency",
        "clientName": "Top Client",
        "totalBill": 2000
    }
]
```

**Response:** Status 200 OK

### Token-Based Authentication

Implement token-based authentication using JWT (JSON Web Tokens). Include an authentication middleware to secure your endpoints. Ensure that clients need to include a valid token in the header of their requests to access protected routes.

### MongoDB Integration

Integrate MongoDB to store and retrieve agency and client data. Use MongoDB libraries to establish a connection, perform CRUD operations, and handle validation of required fields.

### HTTP Status Codes

- **200 OK:** Successful requests for updating client details and retrieving top clients.
- **201 Created:** Successful request for creating an agency and client.
- **401 Unauthorized:** Unauthorized access due to missing or invalid authentication token.
- **400 Bad Request:** Invalid request format or missing required fields.
- **500 Internal Server Error:** Server-side errors, such as database connection issues.
