# Packages

- npm init -y

```sh
> npm install express ts-node-dev typescript @types/express
```

- tsc --init

# Secret for kubernetes

This is like an environment variable which can be share by pods/nodes in a cluster, in our case we want to share our JWT secret so we need to fire this command

```sh
> kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
//asdf is the secret
```

To get the screts

```sh
> kubectl get secrets
```

# Creating NPM module

we in this commit, are starting to create a NPM package for our use to extract the business logic of error handling, etc to a NPM package. Which will help us in code reusability in diffrent micro services. This will be located in `common` folder.