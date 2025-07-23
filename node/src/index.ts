import 'reflect-metadata'
import { Container } from 'typedi'
import { App } from './app'

async function bootstrap() {
  const app = Container.get(App)
  await app.start()
}

bootstrap()
  .then(() => {
    console.log('App is ready')

    async function gracefulShutdown() {
      console.log('Shutting down...')
      const app = Container.get(App)
      await app.stop()

      console.log('Goodbye!')
      process.exit(0)
    }

    for (const signal of ['SIGTERM', 'SIGINT'] as NodeJS.Signals[]) {
      process.on(signal, gracefulShutdown)
    }

    process.on('uncaughtException', (error, origin) => {
      console.error('Uncaught exception:', {
        error,
        origin
      })
    })

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled rejection:', {
        reason,
        promise
      })
    })
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
