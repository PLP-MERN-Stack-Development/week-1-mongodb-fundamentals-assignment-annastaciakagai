
db.books.find({genre: 'Fantasy'})

db.books.find({published_year: {$gte: 1900}})

db.books.find({author: 'Aldous Huxley'})

db.books.updateOne(
    {title: 'The Lord of the Rings'},
    {$set: {price: 22}}
)

db.books.deleteOne({title: 'Animal Farm'})

//Task2:Advanced Queries

db.books.find(
    {in_stock:true, published_year: {$gt: 2010}}
)

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

db.books.find().sort({ price: 1 })

db.books.find().sort({ price: -1 })

// Page 1 (first 5 books)
db.books.find().limit(5)

// Page 2 (next 5 books)
db.books.find().skip(5).limit(5)


//Task 4
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])


db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
        "s"
      ] },
      count: { $sum: 1 }
    }
  }
])


//Task 5

db.books.createIndex({ title: 1 })

db.books.createIndex({ author: 1, published_year: 1 })

db.books.find({ title: "1984" }).explain("executionStats")