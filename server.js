const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const slides = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Broadway_tower_edit.jpg',
    caption: 'Broadway Tower, Cotswolds, England',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/2560px-Polarlicht_2.jpg',
    caption: 'Eielson Air Force Base, Alaska',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/NZ_Landscape_from_the_van.jpg',
    caption: 'NZ Landscape',
  },
];

let profile = {
  name: 'AI Bot',
  location: 'The Cloud, Earth',
  bio: 'Lorem ipsum dolor sit amet, in posidonium efficiantur qui, case postea urbanitas has ex.\n' +
    'An minim habemus corpora eum. Eos cu consul tincidunt. Mei ea aeque maiorum vulputate.\n' +
    'Cu accusata senserit tractatos eam, cu mea oratio reformidans.',
  phone: '+1-202-555-0176',
  workPhone: '+1-202-555-0135',
  email: 'personalemail@mailinator.com',
  workEmail: 'workemail@mailinator.com',
};

// The GraphQL schema in string form
const typeDefs = `
  type Query { slides: [Slide], profile: Profile, homepage: Homepage }
  type Mutation { updateProfile(
    name: String
    location: String
    bio: String
    phone: String
    workPhone: String
    email: String
    workEmail: String
  ): Profile }
  type Slide { image: String, caption: String }
  type Homepage { image: String, caption: String, profile: Profile }
  type Profile {
    name: String!
    location: String!
    bio: String!
    phone: String!
    workPhone: String!
    email: String!
    workEmail: String! 
  }
`;

// The resolvers
const resolvers = {
  Query: { slides: () => slides, profile: () => profile, homepage: () => {
      return Object.assign({}, slides[0], { profile });
    }
  },
  Mutation: { updateProfile: (root, args) => {
    profile = Object.assign({}, profile, args);
    return profile;
  }},
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();
app.use(cors());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
