import React from 'react'
import Flex from './Flex'
import Tag from './Tag'

interface TagItemProps {
  isActive?: boolean
  term: string
}

interface TagListProps<T extends TagItemProps> {
  items: T[]
  handleTagClick(item: T): void
}

const TagList: React.FC<TagListProps<TagItemProps>> = ({
  items,
  handleTagClick,
}) => (
  <>
    <Flex flexWrap="wrap" justifyContent="center" style={{ width: '80%' }}>
      {items.map((item, i) => (
        <Tag
          key={i}
          m={5}
          onClick={() => handleTagClick(item)}
          variant={item.isActive ? 'active' : 'default'}
        >
          {item.term}
        </Tag>
      ))}
    </Flex>
  </>
)

export default TagList
