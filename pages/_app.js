import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import store from '../store/index.js'
import { Provider } from 'react-redux'

export default class MyApp extends App {
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
    
        return {
            pageProps,
            Component
        }
    }
    render () {
        const {Component, pageProps} = this.props
        return <Container>
          <Head>
              <title>next-react</title>
          </Head>
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
        </Container>
    }
}