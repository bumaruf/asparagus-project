import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../lib/mongodb'
import Metering from '../../models/Metering'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const measurements = await Metering.aggregate([{
          $group: {
            _id: null,
            temperature_average: { $avg: "$temperature" },
            humidity_average: { $avg: "$humidity" }
          }
        }])

        res.status(201).json({
          temperature_average: parseFloat(measurements[0].temperature_average).toFixed(2),
          humidity_average: parseFloat(measurements[0].humidity_average).toFixed(2)
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    
    default:
      return res.status(400).json({ success: false })
  }
}
