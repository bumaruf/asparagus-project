import mongoose from 'mongoose'

const MeteringSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, 'Please provide a temperature value']
  },
  humidity: {
    type: Number,
    required: [true, 'Please provide a humidity value']
  }
}, {
  timestamps: true
})

export default mongoose.models.Metering || mongoose.model('Metering', MeteringSchema)