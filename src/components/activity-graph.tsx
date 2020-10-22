import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { ResponsiveCalendar } from '@nivo/calendar'

const GraphContainer = styled.div`
  height: 250px;
  @media (max-width: 600px) {
    height: 150px;
  }
`

interface GraphData {
  day: string
  value: number
}

interface ActivityGraphProps {
  events: Array<{ created_at: string }>
}

export const ActivityGraph = memo(({ events }: ActivityGraphProps) => {
  const data = events.reduce((acc, x) => {
    const day = x.created_at.split('T')[0]
    const dayInArray = acc.find((d) => d.day === day)
    if (dayInArray) {
      dayInArray.value++
    } else {
      acc.push({ day, value: 1 })
    }
    return acc
  }, [] as GraphData[])

  return (
    <GraphContainer>
      <ResponsiveCalendar
        data={data}
        from="2020-01-01"
        to="2020-12-31"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 20, right: 10, bottom: 40, left: 10 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </GraphContainer>
  )
})
