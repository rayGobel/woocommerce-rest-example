# Vue.js Introduction

This is a WordPress backend installation instruction.

## Instruction

1. Use Docker to install Wordpress and XAMPP stack

```
docker pull wordpress
```

2. Run wordpress with script `docker-wordpress.sh`

    - Create separate docker network
    - Create MySQL/MariaDB container
    - Link Wordpress and MySQL together

3. Continue Installation by accessing `localhost:8080`
4. Install WooCommerce
5. Fill in basic products or use existing database import
6. Setup:

    - Wordpress permalink format
    - Basic access token for REST service

7. Set REST access token to `secret.json` file
8. Test if REST api call are successful
9. Use `node listProduct.js`
