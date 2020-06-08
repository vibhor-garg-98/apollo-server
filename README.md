# Introduction to GraphQl
**Introduction**
 - GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.
 
 - GraphQL here tries reduce these complexities by arranging back-end data in graphical view. Then client can query any fragment of this data, passing their query & get only what’s required.
 
 - RESTful APIs follow clear and well-structured resource-oriented approach. However, when the data gets more complex, the routes get longer. Sometimes it is not possible to fetch data with a single request. This is where GraphQL comes handy. GraphQL structures data in the form of a graph with its powerful query syntax for traversing, retrieving, and modifying data.
 
 - Consider the GraphQL query given below This will return values only for the id and firstname fields. The query will not fetch values for other attributes of the student object. The response of the query illustrated above is as shown below 
 GraphQL query:- {students {id firstName} }
respnse:- {"data": {"students": [{"id": "S1001","firstName": "Mohtashim"},{"id": "S1002","firstName": "Kannan"}]}}
***
# Difference between GraphQL and Rest.
**Rest**
- REST is an API design architecture that’s used to implement web services. RESTful web services allow systems to access and manipulate the textual representations of web resources using a predefined set of stateless operations (including GET, POST, PUT, and DELETE). The core idea of REST is that everything is a resource that’s identified by a URL. In its simplest form, you would retrieve a resource by putting through a GET request to the resource’s URL and get a JSON response (or something similar depending on the API).
- REST is scalable
- REST APIs offer a great deal of flexibility

**GraphQL**
- GraphQL is an API design architecture that takes a different, more flexible approach. The key difference between GraphQL vs REST is that GraphQL doesn’t deal with dedicated resources. Instead, everything is regarded as a graph implying it’s connected.
- GraphQL defines the capabilities of APIs using a strong type system that essentially tells the client how it can access data.
- GraphQL makes rapid product iterations on the front-end possible
- GraphQL, developers are able to gain insight into the data that’s requested on the back-end 

**Similarities**
- Both are based on the concept of a resource and can specify IDs for resources.
- Both can be fetched via an HTTP request.
- Both can return JSON data in the request.

**Differences**
- Data fetching with REST causes over- and under-fetching issues whereas this simply isn’t possible with GraphQL.
- The endpoint you call in REST is that object’s identity whereas, in GraphQL, the object’s identity has nothing to do with how you fetch it. In other words, in REST you define the object on Backend and on GraphQL you "define" this object on Frontend.
- With REST, the server determines the shape and size of the resource whereas, in GraphQL, the server simply declares the available resources and the client can ask for exactly what it needs.
- REST automatically puts caching into effect whereas GraphQL has no automatic caching system.
- Error handling in REST is much simpler as compared to GraphQL which typically gives you a 200 OK status code.
***
# GraphQL - Schema

A GraphQL schema is at the core of any GraphQL server implementation. It describes the functionality available to the client applications that connect to it. We can use any programming language to create a GraphQL schema and build an interface around it.

The GraphQL runtime defines a generic graph-based schema to publish the capabilities of the data service it represents. Client applications can query the schema within its capabilities. This approach decouples clients from servers and allows both to evolve and scale independently.

Every type definition in a GraphQL schema belongs to one of the following categories:

- **Scalar types** : - Scalar types are similar to primitive types in your favorite programming language.They always resolve to concrete data.(Int, float, string, boolean) 
- **Object types**:- Most of the types you define in a GraphQL schema are object types. An object type contains a collection of fields, each of which can be either a scalar type or another object type.
type Rocket { id: ID! name: String type: String }
type User { id: ID! email: String! trips: [Launch]! }
type Mission { name: String missionPatch(size: PatchSize): String }
enum PatchSize { SMALL LARGE }

- **The Query type**:- The Query type defines all of the top-level entry points for queries that clients execute against your data graph. It resembles an object type, but its name is always Query. Each field of the Query type defines the name and return type of a different entry point.
type Query { launches: [Launch]! launch(id: ID!): Launch me: User }
- **The Mutation type**:-The Mutation type is similar in structure and purpose to the Query type. Whereas the Query type defines entry points for read operations, the Mutation type defines entry points for write operations. Each field of the Mutation type defines the signature and return type of a different entry point.
type Query { launches: [Launch]! launch(id: ID!): Launch me: User }
- **Input types**:-Input types are special object types that allow you to pass objects as arguments to queries and mutations (as opposed to passing only scalar types). Input types help keep operation signatures clean, much like how accepting a single options object in a JavaScript function can be cleaner than repeatedly adding arguments to the function's signature.
type Mutation {createPost(post: PostAndMediaInput): Post}
input PostAndMediaInput {title: String body: String mediaUrls: [String]}
***
# GraphQL - Resolver

Apollo Server needs to know how to populate data for every field in your schema so that it can respond to requests for that data. To accomplish this, it uses resolvers.

A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.


**Defining Resolver**

Base syntax Let's say our server defines the following (very short) schema:

type Query { numberSix: Int! # Should always return the number 6 when queried numberSeven: Int! # Should always return 7 } We want to define resolvers for the numberSix and numberSeven fields of the root Query type so that they always return 6 and 7 when they're queried.

Those resolver definitions look like this:

const resolvers = { Query: { numberSix() { return 6; }, numberSeven() { return 7; } } }; As this example shows: You define all of your server's resolvers in a single JavaScript object (named resolvers above). This object is called the resolver map. The resolver map has top-level fields that correspond to your schema's types (such as Query above). Each resolver function belongs to whichever type its corresponding field belongs to.

**Handling arguments**
Now let's say our server defines the following (slightly longer) schema:

type User { id: ID! name: String }

type Query { user(id: ID!): User } We want to be able to query the user field to fetch a user by its id.

To achieve this, our server needs access to user data. For this contrived example, assume our server defines the following hardcoded array:

const users = [ { id: '1', name: 'Elizabeth Bennet' }, { id: '2', name: 'Fitzwilliam Darcy' } ]; To learn how to fetch data from an external source (like a database or REST API), see Data sources.

Now we can define a resolver for the user field, like so:

const resolvers = { Query: { user(parent, args, context, info) { return users.find(user => user.id === args.id); } } } As this example shows: A resolver can optionally accept four positional arguments: (parent, args, context, info).