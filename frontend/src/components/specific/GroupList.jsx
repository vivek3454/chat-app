import React from 'react'
import GroupItem from './GroupItem'
import DataNotFound from '../shared/DataNotFound'

const GroupList = ({ w, myGroups = [], chatId }) => {
  return (
    <div className='h-screen sticky top-0 bg-white overflow-y-auto'>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <DataNotFound name="Groups" />
      )}
      {/* <GroupItem /> */}

    </div>
  )
}

export default GroupList