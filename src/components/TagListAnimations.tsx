import React, { useLayoutEffect } from 'react'
import Tag from './Tag'
import useGrid, { GridItem } from '../hooks/useGrid'
import { Global, css } from '@emotion/core'
import { useTransition, animated as a } from 'react-spring'
interface TagItemProps {
  id: string
  term: string
}

interface TagListProps<T extends TagItemProps> {
  activeItems: T[]
  items: T[]
  onSelect(item: T): void
  loading: boolean
}

const ROW_WIDTH = 500
const widths: any[] = []

const TagList: React.FC<TagListProps<TagItemProps>> = ({
  items,
  activeItems,
  onSelect,
  loading,
}) => {
  const gridItems = useGrid<TagItemProps>(
    [...activeItems, ...items],
    widths,
    ROW_WIDTH
  )
  // const [triggerRerender, setTriggerRerender] = React.useState(true)

  const transitions = useTransition(gridItems, (item: GridItem) => item.id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    leave: { opacity: 0, transition: 'opacity .25s ease' },

    config: { mass: 5, tension: 500, friction: 100 },
    trail: 0,
  })

  // React.useLayoutEffect(() => {
  //   setTriggerRerender(false)
  // }, [triggerRerender])

  // React.useLayoutEffect(() => {
  //   console.log('Loading', loading)
  // }, [loading])

  const setWidth = (itemId: any, ref: any) => {
    if (!widths.find(({ id }) => id === itemId)) {
      widths.push({ id: itemId, ref })
    }
  }

  const itemIsActive = (selectedId: string) =>
    activeItems.find(({ id }) => id === selectedId)

  const handleTagClick = (item: any) => {
    const originalItem = items.find(i => i.id === item.id)

    onSelect(originalItem as TagItemProps)
    // setTriggerRerender(true)
  }
  return (
    <>
      <Global
        styles={css`
          .list {
            position: relative;
            font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
              helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
              sans-serif;
            width: 100%;
            height: 100%;
            border: 1px solid black;
            margin-top: 4rem;
          }

          .list > div {
            position: absolute;
            will-change: transform, width, height, opacity;
            padding: 5px;
            height: 40px;
          }

          .list > div > div {
            position: relative;
            background-size: cover;
            background-position: center center;
            width: 100%;
            height: 100%;
            overflow: hidden;
            text-transform: uppercase;
            font-size: 10px;
            line-height: 10px;
            border-radius: 10px;
          }
        `}
      />
      <div className="list" style={{ width: ROW_WIDTH, height: ROW_WIDTH }}>
        {transitions.map<any>(({ item, props: { xy }, ...rest }: any) => {
          return (
            <a.div
              key={item.id}
              ref={ref => setWidth(item.id, ref)}
              style={{
                transform: xy.interpolate(
                  (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
                ),
              }}
            >
              <Tag
                key={item.id}
                onClick={() => handleTagClick(item)}
                variant={itemIsActive(item.id) ? 'active' : 'default'}
              >
                {item.term}
              </Tag>
            </a.div>
          )
        })}
      </div>
    </>
  )
}
export default TagList
