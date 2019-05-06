export interface UseGridItem {
  id: string
  term: string
}

export interface GridItem extends UseGridItem {
  xy: number[]
  width: number
  height: number
  row: number
}

export default function useGrid<T extends UseGridItem>(
  items: T[],
  widths: any[],
  ROW_WIDTH = 1024
) {
  const getWidth = (item: any) => {
    const obj = widths.find(({ id }) => id === item.id)

    return obj && obj.ref ? obj.ref.clientWidth : 0
  }

  const centerItems = (items: GridItem[]) => {
    const rowSpace = items.reduce<any>((rows, item) => {
      if (rows[item.row]) {
        rows[item.row] -= item.width
      } else {
        rows[item.row] = ROW_WIDTH - item.width
      }
      return rows
    }, {})

    return items.map(item => ({
      ...item,
      xy: [item.xy[0] + rowSpace[item.row] / 2, item.xy[1]],
    }))
  }

  let prevElement: GridItem | undefined
  const gridItems = items.map((child: UseGridItem) => {
    if (!prevElement) {
      const gridItem = {
        ...child,
        xy: [0, 0],
        width: getWidth(child),
        height: 50,
        row: 0,
      }
      prevElement = gridItem
      return gridItem
    }
    const doesFit =
      ROW_WIDTH -
        (prevElement.xy[0] + getWidth(prevElement) + getWidth(child)) >=
      0
    const x = doesFit ? prevElement.xy[0] + getWidth(prevElement) : 0
    const y = doesFit
      ? prevElement.xy[1]
      : prevElement.xy[1] + prevElement.height - 10
    const gridItem = {
      ...child,
      xy: [x, y],
      width: getWidth(child),
      height: 50,
      row: doesFit ? prevElement.row : prevElement.row + 1,
    }
    prevElement = gridItem
    return gridItem
  })

  return centerItems(gridItems)
}
