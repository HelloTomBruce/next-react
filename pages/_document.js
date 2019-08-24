import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)
        return { ...props, customVal: 'custom value'}
    }

    render () {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <link rel="stylesheet" type="text/css" href="/static/css/reset.css"/>
                    <link rel="stylesheet" type="text/css" href="/static/css/antd.css"/>
                    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}