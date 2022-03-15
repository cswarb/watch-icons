import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

var schema = buildSchema(`
  type Query {
    watch(id: ID!): Watch,
    watches: [Watch],
  }

  type Watch {
    id: ID!,
    make: String,
    model: String,
    breakdown: [Breakdown],
    noteableModels: [String],
    price: Price,
  }

  type Breakdown {
    description: String,
  }

  type Price {
    start: Int,
    end: Int,
  }
`);


var root = { 
    watch: (props) => {
        return {
            make: 'test',
            model: 'test'
        }
    },
    watches: (props) => {
        return [{
            make: 'test',
            model: 'test'
        }]
    }
};

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));