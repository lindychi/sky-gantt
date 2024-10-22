export function convertToHierarchy<
  T extends { children?: T[]; [key: string]: any }
>(items: T[], idKey: string, upperIdKey: string): T[] {
  // 결과를 저장할 맵 생성
  const itemMap = new Map<string, T>();

  // 최상위 아이템을 저장할 배열
  const rootItems: T[] = [];

  // 모든 아이템을 맵에 저장
  items.forEach((item) => {
    // 깊은 복사를 통해 원본 객체 변경 방지
    const newItem = { ...item, children: [] };
    // children 배열 초기화
    newItem.children = [];
    itemMap.set(item[idKey], newItem);
  });

  // 계층 구조 생성
  items.forEach((item) => {
    const currentItem = itemMap.get(item[idKey]);
    if (!currentItem) {
      throw new Error(`Item with id ${item[idKey]} not found in map`);
    }

    if (item[upperIdKey] === null) {
      // 상위 아이템이 없는 경우 최상위 배열에 추가
      rootItems.push(currentItem);
    } else {
      // 상위 아이템이 있는 경우 해당 아이템의 children 배열에 추가
      const parentItem = itemMap.get(item[upperIdKey]);
      if (parentItem) {
        parentItem.children?.push(currentItem);
      }
    }
  });

  return rootItems;
}
