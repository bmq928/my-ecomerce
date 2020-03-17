import React, { Suspense, FunctionComponent } from 'react'

import ProgressBar from '../ProgressBar'

export default function LazyWrapper(Page: FunctionComponent) {
  
  return (props: object) => (
    <Suspense fallback={<ProgressBar />}>
      <Page {...props} />
    </Suspense>
  )
}
