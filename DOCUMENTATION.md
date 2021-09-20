# API DOCUMENTATION

Base url : http://127.0.0.1:8000 (Development server)  
**Do not hard code this url. Store it as environment variable as it has to be changed in production**

---

---

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
