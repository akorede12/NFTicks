import Head from 'next/head'
import React from 'react'
import CreateEventScreen from '../frontend/components/screens/CreateEventScreen'

function CreateEvents() {
  return (
    <>
      <Head>
        <title>Create an event on NFTicks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateEventScreen />
    </>
  )
}

export default CreateEvents