import mongose from 'mongoose'

export  const connectDB = async()=>{
      try {
            const conn = await mongose.connect(process.env.MONGO_URI)
            console.log('Mongodb connected', conn.connection.host)
      } catch (error) {
            console.log('mongodb connection error ', error)
      }
}