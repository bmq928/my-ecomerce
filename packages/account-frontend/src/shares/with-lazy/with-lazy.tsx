import React, { ComponentType, Suspense } from 'react'
import ProgressBar from '../ProgressBar'

export default function withLazy<P extends object>(Component: ComponentType<P>) {
  return (props: P) => (
    <Suspense fallback={<ProgressBar />}>
      <Component {...props} />
    </Suspense>
  )
}
