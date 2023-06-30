const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
    // allBooks: async (root, args) => {
    //   const allBooks = await Book.find({}).populate("author");
    //   if (!args.author && !args.genre) {
    //     return allBooks;
    //   }
    //   if (args.author) {
    //     return allBooks.filter((book) => book.author.name === args.author);
    //   }
    //   if (args.genre) {
    //     return allBooks.filter((book) => book.genres.includes(args.genre));
    //   }
    // },
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        filter["author.name"] = args.author;
      }

      if (args.genre && args.genre !== "all genres") {
        filter.genres = args.genre;
      }

      const allBooks = await Book.find(filter).populate("author");
      return allBooks;
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

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
