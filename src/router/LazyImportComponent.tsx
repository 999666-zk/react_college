import React, { FC, LazyExoticComponent } from 'react'

export const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<FC<object>> }) => {
  return (
    <React.Suspense fallback={<div className="w-[100vw] h-[100vh] flex justify-center items-center"></div>}>
      <props.lazyChildren />
    </React.Suspense>
  )
}
