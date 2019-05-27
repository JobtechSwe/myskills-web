import React from 'react'
import Flex from './Flex'
import Tag from './Tag'
import { handleFocusKeyDown } from 'utils/helpers'

interface TagItemProps {
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
  const itemIsActive = (selectedTerm: string) =>
    activeItems.find(({ term }) => term === selectedTerm)

  return (
    <Flex
      alignItems="center"
      data-testid="tagList"
      flexWrap="wrap"
      justifyContent="center"
    >
      {[...activeItems, ...items].map((item, i) => (
        <Tag
          key={item.term}
          mb={5}
          ml={2}
          mr={2}
          mt={5}
          onClick={() => onSelect(item)}
          onKeyDown={handleFocusKeyDown(() => onSelect(item))}
          role="button"
          tabIndex={0}
          variant={itemIsActive(item.term) ? 'active' : 'default'}
        >
          {item.term}
        </Tag>
      ))}
    </Flex>
  )
}
export default TagList
