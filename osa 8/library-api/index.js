const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const jwt = require("jsonwebtoken");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`;

//const { v1: uuid } = require("uuid");

const resolvers = {
  Query: {
    // bookCount: () => books.length,
    // authorCount: () => authors.length,
    me: (root, args, context) => {
      return context.currentUser;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      console.log("authors.length: ", authors.length);
      return authors.length;
    },
    bookCount: async () => {
      const books = await Book.find({});
      console.log("books.length: ", books.length);
      return books.length;
    },
    allBooks: async (root, args) => {
      const allBooks = await Book.find({}).populate("author");
      if (!args.author && !args.genre) {
        return allBooks;
      }
      if (args.author) {
        return allBooks.filter((book) => book.author.name === args.author);
      }
      if (args.genre) {
        return allBooks.filter((book) => book.genres.includes(args.genre));
      }
    },
    // allAuthors: () => authors,
    allAuthors: async () => {
      const allAuthors = await Author.find({});
      return allAuthors;
    },
  },
  Author: {
    bookCount: async (root) => {
      let count = 0;
      const allBooks = await Book.find({}).populate("author");
      console.log("allbooks: ", allBooks);
      allBooks.forEach((b) => {
        if (b.author.name === root.name) {
          count++;
        }
      });
      // books.forEach((b) => {
      //   if (b.author === root.name) {
      //     count++;
      //   }
      // });
      return count;
    },
  },
  Mutation: {
    // addBook: async (root, args) => {
    //   //const book = { ...args, id: uuid() };
    //   const book = new Book({ ...args });

    //   const author = { name: book.author };
    //   books = books.concat(book);

    //   const isAuthorExists = authors.find((a) => a.name === author.name);

    //   if (!isAuthorExists) {
    //     authors = authors.concat(author);
    //   }

    //   try {
    //     await book.save();
    //   } catch (error) {
    //     throw new GraphQLError("Saving book failed", {
    //       extensions: {
    //         code: "BAD_USER_INPUT",
    //         invalidArgs: args.title,
    //         error,
    //       },
    //     });
    //   }

    //   return book;
    // },
    addBook: async (root, args, context) => {
      const authorName = args.author;
      const currentUser = context.currentUser;
      console.log("current user: ", currentUser);

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let author = await Author.findOne({ name: authorName });

      if (!author) {
        // Create a new author if they don't exist
        author = new Author({ name: authorName });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              invalidArgs: authorName,
              error,
            },
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id, // Assign the ObjectId of the author
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      // Fetch the populated author object from the database
      const populatedBook = await Book.findById(book._id).populate("author");

      return populatedBook;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log("current user: ", currentUser);
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let allAuthors = await Author.find({});
      const author = allAuthors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }

      // const updatedAuthor = { ...author, born: args.setBornTo };
      // console.log("allAuthors: ", allAuthors);
      //allAuthors.map((a) => (a.name === args.name ? updatedAuthor : a));
      const newAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      // console.log("updatedAuthor: ", updatedAuthor);
      console.log("newAuthor: ", newAuthor);
      return newAuthor;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
