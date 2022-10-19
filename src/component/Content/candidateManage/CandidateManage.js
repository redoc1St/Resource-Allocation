import React from 'react'
import BasicBreadcrumbs from '../../breadcrumbs/BasicBreadcrumbs'
import Search from '../../option/Search'
import TableCandidate from '../../table/tableCandidate/TableCandidate'

export default function CandidateManage() {
  return (
    <div>
    <h3
        style={{
          fontWeight: "bold",
          color: "#121843",
        }}
      >
        Candidate Management
      </h3>
      <div>
      <BasicBreadcrumbs />
<Search placeholder="Enter candidate name"/> 
<TableCandidate/>

      </div>
    </div>
  )
}
