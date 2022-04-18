# Frontend 

Frontend created using `create-react-app` as a starting point, and [MUI](https://mui.com/) for styling

The included dockerfile builds the application in production mode, and runs it in a lightweight nginx container using the included `nginx.conf`. This configuration proxies all requests under `/api` to the backend container.

## Running

```
$ yarn start
```