require('dotenv').config();

module.exports = {
  MONGODB_URI: `mongodb://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.myo44.gcp.mongodb.net:27017,cluster0-shard-00-01.myo44.gcp.mongodb.net:27017,cluster0-shard-00-02.myo44.gcp.mongodb.net:27017/library_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
};