# MicroServices with NodeJs & React

### The first project which is on the main branch is just for the taste of microServices, we will have many tools & plugins later but the basic flow is introduced in this projet

> In the server there are two folders *posts* & *comments* this are both two diffrent servers as of microService architecture 

- This app will have `post service` and `comments service`

### we created the basic app, but now we will do it in async style i.e the micro-services style using the **`Event Bus`**

![](https://i.ibb.co/tcRFvdP/Event-bus.png)
> Checkout the **1. Event_bus** *branch* for the detailed understanding

> *Event bus* receives events, pulishes them to listeners

## Diffrent Types of **Event Bus**

- `RabbitMQ`
- `Kafka`
- `Nats` and many more 

# Explaination of the particular commit

- Firstly we created the event-bus which is nothing but a route which has the post method on it with the event.

- If other servers send the request on the event-bus url with */event* the event is taken by it and is forwarded to the other listners in our case the *posts* and *comments* server.

- On the side of the *posts*, when a *posts server* receives a `post` request, then after saving it to db it forwards the event to the *eventBus* url `/events` with the `type` i.e *post-Created* and the data that is the post itself. 

```js
 await axios.post('______/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });
```

- Then this post request is recieved by the eventBus which sends it to the listeners. The listeners then get the required data.

```js
app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    res.send({});
})
```

## Here we are adding a small new feature called **Moderation**

![](https://i.ibb.co/85ZXvG5/query-service1.png)

This will be for the comments, like a filter where a comments is checked before publishing to the public

![](https://i.ibb.co/wLVpbG4/create2.png)

- The moderation microService check the comment for any restricted word

- As soon as the user submits the comment, it is saved with the status of `pending` in the db

- Then this will go to the *eventBus* which will further notify the *moderation* service & the *query* service, which will immediately store the data into it with status of pending for the comment

- As the event is forwarded to moderation service, it will check the *type* property on the comment, if the type is *commentCreated* then it will check for the content i.e the comment itself for the particular word(restricted word) & checking the condition it will be added with the status of **rejected** or **approved**

- After changing the status of the comment, the event is forwarded to the *evnetBus* with the type *commentModerated* & data with the changes made to it.

- The comment service then receives the request from *eventBus* & checks the type,if the type is *commentModerated* then we will find the comment from the Object & change the status of the comment from 'pending' to 'approved' or 'rejected' depending on what the moderation service sends us. 

- Then the comment service send the request to the *eventBus* with the type *CommentUpdated* and the updated data so that it can forward it to the suscribers i.e *query Service*

- In query service we will check if the request has a type *CommentUpdated* then we will comment from the post and update its status from 'pending' to either 'approved' or 'rejected'

# Missing Events (Sync)

- This occurs when a service is left behind, that means if the service was working fine but due to some reasons it went down then the events those were triggred during the time are lost into the time till the service that is responsible comes up.

- To over come this issue the events are stored into the event bus itself into the db bcoz this is going to grow bigger in time.

- Then the query server can query all the events occured earlier while it was down or yet to be implemented.

![](https://i.ibb.co/3Bm09Dn/event-store.png)

# kubernetis

For more information on kubernitis, refer my [Notes](https://gist.github.com/IcedMonk/860b54e51d1a0ca28905d8367b03f274)