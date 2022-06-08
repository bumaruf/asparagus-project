import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { convertIsoToString } from '../utils/convertIsoToString'
import { Metering } from '../interfaces/metering.interface'
import { api } from '../services/api'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [lastMetering, setLastMetering] = useState<Metering>();

  useEffect(() => {
    api.get<Metering[]>('api/metering?last=true').then((response) => {
      console.log(response.data[0])
      setLastMetering(response.data[0])
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Asparagus Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Asparagus Management
        </h1>

        <div className={styles.grid}>
          <Link href="/compare">
            <a className={styles.card}>
              <h2>Temperature &rarr;</h2>
              <p>Last measurement: {lastMetering?.temperature}º Celsius</p>
              <span>Last update: {lastMetering?.createdAt && convertIsoToString(lastMetering.createdAt)}</span>
            </a>
          </Link>

          <Link href="/compare">
            <a className={styles.card}>
              <h2>Humidity &rarr;</h2>
              <p>Last measurement: {lastMetering?.humidity}%</p>
              <span>Last update: {lastMetering?.createdAt && convertIsoToString(lastMetering.createdAt)}</span>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
