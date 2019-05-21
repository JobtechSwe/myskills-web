import React from 'react'
import Flex from './Flex'
import Tag from './Tag'
import { handleFocusKeyDown } from 'utils/helpers'

interface TagItemProps {
  id: string
  term: string
}

interface TagListProps<T extends TagItemProps> {
  activeItems: T[]
  items: T[]
  onSelect(item: T): void
}

const TagList: React.FC<TagListProps<TagItemProps>> = ({
  items,
  activeItems,
  onSelect,
}) => {
  const itemIsActive = (selectedId: string) =>
    activeItems.find(({ id }) => id === selectedId)

  return (
    <Flex
      alignItems="center"
      data-testid="tagList"
      flexWrap="wrap"
      justifyContent="center"
    >
      {[...activeItems, ...items].map(item => (
        <Tag
          key={item.id}
          m={6}
          onClick={() => onSelect(item)}
          onKeyDown={handleFocusKeyDown(() => onSelect(item))}
          role="button"
          tabIndex={0}
          variant={itemIsActive(item.id) ? 'active' : 'default'}
        >
          {item.term}
        </Tag>
      ))}
    </Flex>
  )
}
export default TagList
