import { Service } from 'typedi'

@Service()
export class App {
  public async start() {
    console.log('App is started')
  }

  public async stop() {
    console.log('App is stopped')
  }
}
