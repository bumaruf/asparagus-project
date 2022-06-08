import { useEffect, useState } from 'react';
import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link';
import { Table } from '@nextui-org/react';

import { convertIsoToString } from '../../utils/convertIsoToString';
import { Metering } from '../../interfaces/metering.interface';
import { api } from '../../services/api';

import styles from '../../styles/Compare.module.css'
import { Averages } from '../../interfaces/averages.interface';

const Compare: NextPage = () => {
  const [measurements, setMeasurements] = useState<Metering[]>([]);
  const [averages, setAverages]= useState<Averages>(
    { humidity_average: '0', temperature_average: '0' }
  );

  const handleUpdateMeasurements = () => {
    api.get<Metering[]>('api/metering').then((response) => {
      setMeasurements(response.data)
    })

    api.get<Averages>('api/averages').then((response) => {
      setAverages(response.data)
    })
  }

  useEffect(() => {
    handleUpdateMeasurements()

    setInterval(() => {
      handleUpdateMeasurements()
    }, 2000);
  }, [])

  const columns = [
    {
      key: "temperature",
      label: "TEMP (CELSIUS)",
    },
    {
      key: "humidity",
      label: "HUMIDITY (PERCENTAGE)",
    },
    {
      key: "createdAt",
      label: "TIME",
    }
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Asparagus Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a className={styles.backButton}>Back to home</a>
        </Link>

        <h1 className={styles.title}>
          All registers average
        </h1>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Temperature:</h2>
            <p>{averages.temperature_average}º Celsius</p>
          </div>
          
          <div className={styles.card}>
            <h2>Humidity:</h2>
            <p>{averages.humidity_average}%</p>
          </div>
        </div>

        <h1 className={styles.title}>
          Comparisons in real time (Last 30 registers)
        </h1>


        <div className={styles.tableWrapper}>
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              width: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body>
              { measurements.map(metering => 
                <Table.Row key={metering._id}>
                  <Table.Cell>{metering.temperature}</Table.Cell>
                  <Table.Cell>{metering.humidity}</Table.Cell>
                  <Table.Cell>{convertIsoToString(metering.createdAt)}</Table.Cell>
                </Table.Row>
              )}
              
            </Table.Body>
          </Table>
        </div>

      </main>
    </div>
  )
}

export default Compare
