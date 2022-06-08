import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../lib/mongodb'
import Metering from '../../models/Metering'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    // Show first 30 measurements
    case 'GET':
      try {
        let measurements

        if (req.query.last === 'true') {
          measurements = await Metering.find().sort({"createdAt": -1}).limit(1)
        } else {
          measurements = await Metering.find().sort({"createdAt": -1}).limit(30)
        }
        
        res.status(201).json(measurements)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // Register a metering
    case 'POST':
      try {
        const { temperature, humidity } = req.body
  
        // Insert data in mongoDB
        const metering = await Metering.create({
          temperature,
          humidity,
        })
  
        res.status(201).json({ success: true, data: metering })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // Delete all registers
    case 'DELETE':
      try {
        await Metering.deleteMany({})

        res.status(201).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    
    default:
      return res.status(400).json({ success: false })
  }
}
