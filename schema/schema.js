const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                //return _.find(authors, {id: parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        books: {type: GraphQLList(BookType),
            resolve(parent,args){
                //return _.filter(books, {authorid:parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(books, {id: args.id}); 
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id: args.id}); 
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


// // dummy data
// var books = [
//     {name: 'Rich Dad Poor Dad', genre: 'Personal Finance', id: '1', authorid: '2'},
//     {name: 'How to Win Friends and Influence People', genre: 'Non-fiction', id: '2', authorid: '3'},
//     {name: 'The 4-Hour Workweek', genre: 'Entrepeneurship', id: '3', authorid: '1'},
//     {name: 'The Leader in You', genre: 'Leadership', id: '4', authorid: '3'},
//     {name: 'The Business School', genre: 'Entrepeneurship', id: '5', authorid: '2'},
//     {name: 'Rich Dad\'s Cashflow Quadrant', genre: 'Finance', id: '4', authorid: '2'}
// ];
// var authors = [
//     {name: 'Timothy Ferriss', age: 40, id: '1'},
//     {name: 'Robert T. Kiyosaki', age: 70, id: '2'},
//     {name: 'Dale Carnegie', age: 130, id: '3'},
// ];
