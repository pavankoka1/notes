const data = {
    authors: [
        { id: "1", name: "Pavan Koka", bookIds: ["101", "102"] },
        { id: "2", name: "Charlie", bookIds: ["103"] },
    ],
    books: [
        { id: "101", title: "Harry Potter", publishedYear: 1997, authorId: 1 },
        {
            id: "102",
            title: "Lord of the Rings",
            publishedYear: 1990,
            authorId: 1,
        },
        {
            id: "103",
            title: "How to trick hooman for walks?",
            publishedYear: 2000,
            authorId: 2,
        },
    ],
};

export const resolvers = {
    Book: {
        author: (parent, args, context, info) => {
            return data.authors.find(
                (authorDetails) => authorDetails.id === parent.authorId,
            );
        },
    },
    Author: {
        books: (parent) => {
            return data.books.filter((book) =>
                parent.bookIds.includes(book.id),
            );
        },
    },
    Query: {
        authors: () => {
            return data.authors;
        },
        books: () => {
            return data.books;
        },
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            const newBook = { ...args, id: data.books.length + 1 };
            data.books.push(newBook);
            return newBook;
        },
    },
};
