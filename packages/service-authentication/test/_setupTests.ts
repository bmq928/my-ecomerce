import { refreshAll, disconnectAll } from './_teardown'

afterEach(async done => {
  await refreshAll()
  done()
})

afterAll(async done => {
  await disconnectAll()
  done()
})
