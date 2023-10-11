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
