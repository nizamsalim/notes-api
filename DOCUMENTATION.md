# **API DOCUMENTATION**

Base url : http://127.0.0.1:8000 (Development server)  
**Do not hard code this url. Store it as environment variable as it has to be changed in production**

---

---

## **LIST OF ALL AVAILABLE ENDPOINTS**

| Name          | Method | Endpoint     | Description                                               |
| ------------- | ------ | ------------ | --------------------------------------------------------- |
| Get all users | GET    | /auth/users  | To display all users in the database (Temporary endpoint) |
| Signup        | POST   | /auth/signup | Accepts user data and creates new user. Returns authToken |
| Login         | POST   | /auth/login  | Accepts email and password and returns authToken          |

---

## **LIST OF ALL USERS** (Temporary)

GET **`/auth/users`**

### Success response

```
{
  "success": true,
  "users": [
    {
      "_id": "614756eb5890588d01a0b397",
      "name": "John Doe",
      "username": "jdoe",
      "phone": "1234567890",
      "email": "jd@gm.com",
      "password": "$2b$10$aJra4LwtfGA1wHfEjY.MZeFfcQE9S/vp4OIqlk9OpTfgKr1QGqZYG",
      "__v": 0
    },
    {
      "_id": "615bcd9a929d04803e058899",
      "name": "Manoj Kumar",
      "username": "mankumar",
      "phone": "9999999999",
      "email": "mk@gm.com",
      "password": "$2b$10$yh.vjuKON0QhpIorxFDflOQYqcNuwcY/oDZn8.Nau3qRRXJn3HSkW",
      "__v": 0
    }
  ]
}
```

## **SIGNUP**

POST **`/auth/signup`**

### Expected data format

```
{
    name:"John Doe",
    username:"john_doe"
    phone:"9999999999",
    email:"johndoe@example.com",
    password:"johndoe123"
}
```

### Success response

```
{
    success:true,
    authToken:'eurhfbweurygfwnyergfwyrf86woermyg',
    user:{
        name:"John Doe",
        username:"john_doe",
        phone:"9999999999",
        email:"johndoe@example.com",
    }
}
```

### Failure response

```
{
    success:false,
    error:"error message"
}
```

---

## **LOGIN**

POST **`/auth/login`**

### Expected data format

```
{
    email:"johndoe@example.com",
    password:"johndoe123"
}
```

### Success response

```
{
    success:true,
    authToken:'eurhfbweurygfwnyergfwyrf86woermyg',
    user:{
        name:"John Doe",
        username:"john_doe",
        phone:"9999999999",
        email:"johndoe@example.com",
    }
}
```

### Failure response

```
{
    success:false,
    error:"error message"
}
```

---
