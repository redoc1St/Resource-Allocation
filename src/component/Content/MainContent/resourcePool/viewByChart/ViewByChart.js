import React from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import Timeline from '../../../../Timeline/Timeline'

export default function ViewByChart() {
  return (
    <div style={{height:'150px',marginTop:'20px'}} >
    <ScrollBar
        style={{
          overflow: "hidden",
          scrollMarginInlineEnd: "50px",
          width: "1280px",
          height: "600px",        }}
      >
    <Timeline/>
    </ScrollBar>
    </div>
  )
}
